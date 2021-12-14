import * as pulumi from '@pulumi/pulumi';
import * as gitlabGroups from './src/gitlab/groups';
import * as gitlabRepos from './src/gitlab/repos';
import * as gitlabMirrors from './src/gitlab/mirrors';
import * as githubRepos from './src/github/repos';

gitlabGroups.groupInfo;
gitlabRepos.repoInfo;
githubRepos.repoList;
gitlabMirrors.repoList;
