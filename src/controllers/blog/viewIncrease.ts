import axios from "axios";
import { Request, Response } from "express";
import Blog from "../../models/Blog";

const IP_GEOLOCATION_API_KEY = "YOUR_API_KEY";

interface LocationData {
  city: string;
  state: string;
  zipcode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const viewIncrease = async (req: Request, res: Response) => {
  const { ip, device } = req.body;
  const { id } = req.params;
  // regex to validate the device, we need to make sure that the device is either mobile, desktop or tablet

  try {
    const locationData: LocationData = await getLocationData(ip);
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const viewIndex = blog.views.findIndex((view) => view.ip === ip);

    if (viewIndex !== -1) {
      blog.views[viewIndex].lastViewed = new Date();
      await blog.save();
      return res.status(200).json({ message: "View Updated" });
    } else {
      blog.views.push({
        ip: ip,
        initialDate: new Date(),
        lastViewed: new Date(),
        location: {
          city: locationData.city,
          state: locationData.state,
          country: locationData.country,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          zipcode: locationData.zipcode,
        },
        device: device ?? "Unknown",
      });
    }

    await blog.save();

    res.status(200).json({ message: "View increased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLocationData = async (ipAddress: string): Promise<LocationData> => {
  const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ipAddress}`);
  const { city, country_name, latitude, longitude, state_prov, zipcode } = response.data;

  return { city, state: state_prov, country: country_name, latitude, longitude, zipcode };
};
