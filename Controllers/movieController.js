const Movie = require('../Models/movieModel')

const createMovie = async (req, res) => {
    try {
        const existingMovie = await Movie.find({ title: req.body.title });
        if (existingMovie.length) {
            res.json({ message: "movie Already Exists" })
            return
        }
        const movie = await Movie.create(
            req.body
        )
        res.json({ message: movie.title + " added successfully", movie })
    } catch (e) {
        console.log(e);
    }
}
const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.json({ message: "updated" })
    } catch (e) {
        console.log(e)
    }
}
const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete({ _id: req.params.id })
        res.json({ message: "deleted" })
    } catch (e) {
        console.log(e)
    }
}
const getMovieDetails = async (req, res) => {
    try {
        // console.log("hii")
        const movie = await Movie.findOne({ _id: req.params.id });
        res.json({ movie })
    }
    catch (e) {
        res.send(e);
    }
}
const random = async (req, res) => {
    const type = req.query.type;
    let Movie1;
    try {
        // console.log(type)
        if (type) {
            if (type === "Series") {
                Movie1 = await Movie.aggregate([
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } }
                ])
            }
            else {
                Movie1 = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } }
                ])
            }
            res.json({ Movie1 })
        }
        else {

            Movie1 = await Movie.aggregate([
                { $sample: { size: 1 } }
            ])
            res.json({ Movie1 })
        }
    }
    catch (e) {
        res.send(e);
    }
}
const getAllMovies = async (req, res) => {
    try {
        const movie = await Movie.find({ isSeries: false });
        if (!movie.length) {
            res.json({ message: "No Movies" })
            return
        }
        res.json({ movies: movie })
    } catch (e) {
        console.log(e)
    }
}
const getAllSeries = async (req, res) => {
    try {
        const series = await Movie.find({ isSeries: true });
        if (!series.length) {
            res.json({ message: "No Series" })
            return
        }
        res.json({ serieses: series })
    } catch (e) {
        console.log(e)
    }
}
const getAllMoviesSeries = async (req, res) => {
    try {
        const series = await Movie.find();
        if (!series.length) {
            res.json({ message: "No MoviesSeries" })
            return
        }
        res.json({ data: series })
    } catch (e) {
        console.log(e)
    }
}
const searchMoviesSeries = async (req, res) => {
    try {
        const searchQuerySearch = req.body.searchQuerySearch;
        let series = await Movie.find();

        if (!series.length) {
            res.json({ message: "No MoviesSeries" });
            return;
        }

        const MoviesSeries = series.filter(item => item.title.toUpperCase().includes(searchQuerySearch.toUpperCase()));
        res.json({ data: MoviesSeries });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server Error" });
    }
};


module.exports = { createMovie, updateMovie, deleteMovie, getMovieDetails, random, getAllMovies, getAllSeries, getAllMoviesSeries,searchMoviesSeries }
