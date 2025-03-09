import { Router } from 'express';
import {
  getGithubDetails,
  getRepoDetails,
  createIssueInRepo,
} from '../controller/github.controller.js';
const githubRouter = Router();

githubRouter.get('/', getGithubDetails);
githubRouter.get('/:repo_name', getRepoDetails);
githubRouter.post('/:repo_name/issues', createIssueInRepo);

export default githubRouter;
