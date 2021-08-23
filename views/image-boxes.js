
import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";

const imageBoxes = (props) => {
    return (req, res) => {
        const {imageUrl} = req.body;

        const stub = ClarifaiStub.grpc();

        // This will be used by every Clarifai endpoint call.
        const metadata = new grpc.Metadata();
        metadata.set("authorization", "Key 3427c2247db9410e88365ce36b50e1e7");
    
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                // General : "aaa03c23b3724a16a56b629203edc62c"
                // Face : "f76196b43bbd45c99b4f3cd8e8b40a8a"
                model_id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
                inputs: [{data: {image: {url: imageUrl}}}]
            },
            metadata,
            (err, response) => {
                if (err) {
                    console.log("Error: " + err);
                    res.json('failed');
                    return;
                }
    
                if (response.status.code !== 10000) {
                    console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                    res.json('failed');
                    return;
                }

                let boxes = response.outputs[0].data.regions.map(face => face.region_info.bounding_box)
                res.json(boxes);
                //update database
            }
        );
    };
};

export default imageBoxes;