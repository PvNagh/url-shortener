import mongoose from 'mongoose';

const Connection = async (url) => {
    const URL = url;
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        console.log('Database Connected Succesfully');
    } catch (error) {
        console.log('Error: ', error.message);
    }
};

export default Connection;