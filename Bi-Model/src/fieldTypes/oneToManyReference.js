/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import mongoose, { Schema } from 'mongoose';

export default {
  graphQLType: (field, databaseModel, postFix) => `${databaseModel.find(
    entity => entity.collectionShortName === field.targetCollectionShortName,
  ).entityShortName}${postFix}`,
  requiresMongooseModel: true,
  getFakedValue: async field =>
    // TODO: Review with combined collections
    new Promise((resolve, reject) => {
      mongoose.model(field.targetCollectionShortName.toLowerCase()).findOneRandom((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result._id);
      });
    }),
  mongooseRef: field => field.targetCollectionShortName.toLowerCase(),
  requiredProperties: [{ propName: 'targetCollectionShortName', type: String }],
  mongooseFieldType: Schema.ObjectId,
};
