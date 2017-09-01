/* eslint no-console: "off" */
import express from 'express';
import { createServer } from 'http';
import { generateGraphQLSchema } from './parser/generateGraphQLSchema';
import settings from './config/settings';
import middleWares from './config/middleWares';
import './config/db';

export default async function server(serverSettings, dataModel, resolvers) {
  const typeDefs = await generateGraphQLSchema(dataModel);
  process.stdout.write('\x1B[2J\x1B[0f'); // To clear the console  
  console.log(typeDefs);
  if (serverSettings) settings.setSettings(serverSettings);

  const app = express();
  middleWares(app, typeDefs, resolvers);

  const graphQLServer = createServer(app);

  graphQLServer.listen(settings.PORT, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`BI-Framework GraphQL API listening: ${settings.PORT}`);
    }
  });
}
