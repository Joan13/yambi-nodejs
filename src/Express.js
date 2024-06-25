import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const Yambi = express();
Yambi.use(express.json());
Yambi.use(cors());

const port = process.env.PORT || 3452;
const ip_mongo = "127.0.0.1:27017";

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
