import axios from 'axios';
import { GITHUB_TOKEN, GITHUB_URL, GITHUB_USERNAME } from '../config/env.js';

export const getGithubDetails = async (req, res) => {
  try {
    const response = await axios.get(`${GITHUB_URL}/user`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    const {
      name,
      username,
      owner,
      login,
      followers,
      following,
      public_repos,
      email,
      total_private_repos,
      private_owned_repos,
      bio,
      location,
      repos_url,
    } = response.data;

    const repoResponse = await axios.get(repos_url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const repositories = repoResponse.data.map(repo => repo.name);

    res.status(200).json({
      success: true,
      data: {
        name,
        username,
        owner,
        login,
        followers,
        following,
        public_repos,
        email,
        total_private_repos,
        private_owned_repos,
        bio,
        location,
        repositories,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export const getRepoDetails = async (req, res) => {
  try {
    const { repo_name } = req.params;

    const response = await axios.get(
      `${GITHUB_URL}/repos/${GITHUB_USERNAME}/${repo_name}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    const repositoryDetails = response.data;

    res.status(200).json({ is_success: true, repositoryDetails });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export const createIssueInRepo = async (req, res) => {
  try {
    const { repo_name } = req.params;
    const { title, body } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: 'Title is required to create an issue' });
    }

    const response = await axios.post(
      `${GITHUB_URL}/repos/${GITHUB_USERNAME}/${repo_name}/issues`,
      { title, body },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    const {
      id,
      number,
      title: issueTitle,
      body: issueBody,
      state,
      html_url,
      timeline_url,
    } = response.data;

    res.status(201).json({
      is_success: true,
      issue: {
        id,
        number,
        issueTitle,
        issueBody,
        state,
        html_url,
        timeline_url,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.response?.data?.message || 'Failed to create issue',
    });
  }
};
