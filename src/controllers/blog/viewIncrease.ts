import axios from 'axios';
import { Request, Response } from 'express';
import Blog from '../../models/Blog';
import ViewSchema from '../../models/ViewSchema';

const IP_GEOLOCATION_API_KEY = 'YOUR_API_KEY';

interface LocationData {
  city: string;
  state: string;
  zipcode: string;
  country: string;
  latitude: number;
  longitude: number;
}
const isBot = (ua: string): boolean =>
  /bot|crawl|spider|slurp|facebook|whatsapp|preview|headless/i.test(ua);

export const viewIncrease = async (req: Request, res: Response) => {
  try {
    // regex to check if the ip is formatted correctly, i.e. xxx.xxx.xxx.xxx
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    // check the ip to see if its formatted correctly
    // next we want to split the ip by "." and check each segments number value to check if its out of range
    const ipSegments = req.body.ip.split('.');
    const isValidIp = ipSegments.every(
      (segment: any) => segment >= 0 && segment <= 255 && !isNaN(segment)
    );
    const userAgent = req.headers['user-agent'] || '';
    if (ipRegex.test(req.body.ip) && isValidIp) {
      // ⛔ Skip bots
      if (isBot(userAgent)) {
        return res.status(200).json({ success: true, message: 'Skipped bot' });
      }

      const now = new Date();
      let location = {} as LocationData;
      const { ip, device } = req.body;
      const { id } = req.params;
      location = await getLocationData(ip);
      const result = await ViewSchema.findOneAndUpdate(
        { blog: id, ip },
        {
          $set: {
            device,
            lastViewedAt: now,
            location,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      return res.status(200).json({ message: 'View increased successfully' });
    }
    return res.status(400).json({ message: 'Invalid IP address' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getLocationData = async (ipAddress: string): Promise<LocationData> => {
  const response = await axios.get(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ipAddress}`
  );
  const { city, country_name, latitude, longitude, state_prov, zipcode } =
    response.data;

  return {
    city,
    state: state_prov,
    country: country_name,
    latitude,
    longitude,
    zipcode,
  };
};
