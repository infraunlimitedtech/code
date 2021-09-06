import * as pulumi from '@pulumi/pulumi';
import * as gitlab from '@pulumi/gitlab';
import * as groups from './src/gitlab/groups';
import * as repos from './src/gitlab/repos';

export const groupInfo = groups.groupInfo;
export const repoInfo = repos.repoInfo;
