import { Request, Response } from 'express';
import { EpisodeModel } from '../models/Episode';
import { handleIdInput, formatResult, getRecordsByModelAndId } from '../util';

// const getEpisodeById = async (req: Request, res: Response) => {
//     try {
//         const ids = handleIdInput(req.params.id);
//         if (ids.length === 0) {
//             return res.status(400).json({ error: 'Bad Request: invalid request input' });
//         }
//         const response = await EpisodeModel.find({ id: { $in: ids } }, '-_id');
//         return response && response.length > 0 ? res.status(200).json(formatResult(response)) : res.status(404).json({ message: 'Character not found with given id' });
//     } catch (error) {
//         return res.status(500).json({ error });
//     }
// };

const getEpisodeById = async (req: Request, res: Response) => {
    return getRecordsByModelAndId(req, res, EpisodeModel, req.params.id);
};

const getEpisodeByFilter = async (req: Request, res: Response) => {
    const title = req.params.episodeTitle;
    try {
        const episode = await EpisodeModel.findOne({ title }, '-_id');
        return episode ? res.status(200).json({ episode }) : res.status(404).json({ message: 'Episode not found with given title' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export default { getEpisodeById, getEpisodeByFilter };
