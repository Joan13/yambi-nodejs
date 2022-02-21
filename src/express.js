import express from 'express';
import cors from 'cors';

const Yambi = express();
Yambi.use(express.json());
Yambi.use(cors());

const port = 3452;
Yambi.listen(port, () => {
	console.log(`Started successfully on port ${port}`);
});

export default Yambi;