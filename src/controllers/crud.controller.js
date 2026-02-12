import { errorHandler } from "../utils/error.js";

// CREATE
export const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    const io = req.app.get("io");
    io.emit(`${Model.modelName.toLowerCase()}:created`, doc);

    return res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateOne = (Model) => async (req, res, next) => {
  try {
    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDoc)
      return next(errorHandler(404, `${Model.modelName} not found!`));

    const io = req.app.get("io");
    io.emit(`${Model.modelName.toLowerCase()}:updated`, updatedDoc);

    return res.status(200).json({
      success: true,
      data: updatedDoc,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc)
      return next(errorHandler(404, `${Model.modelName} not found!`));

    const io = req.app.get("io");
    io.emit(`${Model.modelName.toLowerCase()}:deleted`, deletedDoc);

    return res.status(200).json({
      success: true,
      message: `${Model.modelName} deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = (Model) => async (req, res, next) => {
  try {
    const docs = await Model.find();

    return res.status(200).json({
      success: true,
      count: docs.length,
      data: docs,
    });
  } catch (error) {
    console.log("Error getting all documents:", error);
    next(error);
  }
};

export const getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(
        errorHandler(404, `${Model.modelName} not found!`)
      );
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.log("Error getting document:", error);
    next(error);
  }
};