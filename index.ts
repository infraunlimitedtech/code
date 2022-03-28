import * as pulumi from '@pulumi/pulumi';
import * as gitlabGroups from './src/gitlab/groups';
import * as gitlabRepos from './src/gitlab/repos';
import * as githubRepos from './src/github/mirrored_repos';

gitlabGroups.groupInfo;
gitlabRepos.repoInfo;
githubRepos;
