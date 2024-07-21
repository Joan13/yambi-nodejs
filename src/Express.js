import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const Yambi = express();
Yambi.use(express.json());
Yambi.use(cors());

const port = process.env.PORT || 3452;
const ip_mongo = "127.0.0.1:27017";

export const renderDateUpToMilliseconds = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const hh = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const milliseconds = today.getMilliseconds();

    return yyyy + "" + mm + "" + dd + "" + hh + "" + minutes + "" + seconds + "" + milliseconds;
}

export const randomString = (length) => {
    for (var s = ''; s.length < length; s += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62 | 0));
    return s;
}

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://" + ip_mongo + "/yb_center")
	.then(() => {
		console.log("Connected to MongoDB");

		Yambi.listen(port, () => {
			console.log(`Started successfully on port ${port}`);
		});
	})
	.catch((e) => {
		console.log("Enable to connect to database");
		console.log(e)
	})

export default Yambi;
