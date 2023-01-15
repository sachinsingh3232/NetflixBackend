const List = require('../Models/listModel')

const createList = async (req, res) => {
    try {
        const existingList = await List.find({ title: req.body.title });
        if (existingList.length) {
            res.json({ message: "List named " + req.body.title + " Already Created" })
        }
        const list = await List.create(req.body)
        res.json({ message: "List Created Successfully", list });
    } catch (e) {
        console.log(e)
    }
}
const deleteList = async (req, res) => {
    try {
        await List.findByIdAndDelete(req.params.id)
        res.json({ message: "List Deleted Successfully" });
    } catch (e) {
        console.log(e)
    }
}

const randomList = async (req, res) => {
    const type = req.query.type;
    const genre = req.query.genre;
    let list = []
    try {
        if (type) {
            if (genre) {
                list = await List.aggregate([
                    { $match: { type: type, genre: genre } },
                    { $sample: { size: 10 } }
                ]);
            }
            else {
                list = await List.aggregate([
                    { $match: { type: type } },
                    { $sample: { size: 10 } }
                ]);
            }
        }
        else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.json({ lists: list });
    } catch (e) { console.log(e) }
}
const getListDetails = async (req, res) => {
    try {
        console.log(req.params.id)
        const list = await List.findOne({ _id: req.params.id });
        res.json({ list })
    }
    catch (e) {
        res.send(e);
    }
}
const getAllList = async (req, res) => {
    try {
        const lists = await List.find();
        res.json({ lists });
    } catch (e) {
        console.log(e)
    }
}
const updateList = async (req, res) => {
    try {
        // console.log("hii")
        const list = await List.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.json({ message: "updated" })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { createList, deleteList, randomList, getListDetails,getAllList, updateList }