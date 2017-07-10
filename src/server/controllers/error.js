export default function(req, res) {
    console.error(req.error);
    res.json({error: 'Oops, error occured.'});
}
