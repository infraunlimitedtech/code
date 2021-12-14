import * as gitlab from '@pulumi/gitlab';
import * as pulumi from '@pulumi/pulumi';
import * as groups from './groups';

export const repoList: gitlab.ProjectArgs[] = [
  {
    name: 'infra-proposals',
    description: 'Proposals and experiments for infra',
    namespaceId: groups.groupInfo['infra'].id.apply((id) => +id),
  },
  {
    name: 'pulumi-crosswalks',
    description:
      'Infraunlimited infrastructure with Pulumi. Loosely based on pulumi crosswalks',
    namespaceId: groups.groupInfo['infra'].id.apply((id) => +id),
    visibilityLevel: 'public',
  },
  {
    name: 'code',
    description: 'tools for managing git repositories with IaC',
    namespaceId: groups.groupInfo['infra'].id.apply((id) => +id),
    visibilityLevel: 'public',
  },
  {
    name: 'ansible-role-vault',
    description: 'Ansible role and tools for install/manage Hashi vault',
    namespaceId: groups.groupInfo['ansible'].id.apply((id) => +id),
    visibilityLevel: 'public',
  },
  {
    name: 'os-images',
    description:
      'Scripts for building iso, vagrant boxes, docker images, cloud images, etc',
    namespaceId: groups.groupInfo['os-tools'].id.apply((id) => +id),
    visibilityLevel: 'public',
  },
];

interface Info {
  url: pulumi.Output<string>;
  id: pulumi.Output<string>;
}

type Repositories = {
  [key: string]: Info;
};

export const repoInfo: Repositories = {};

for (let repo of repoList) {
  let res = new gitlab.Project(repo.name as string, repo);
  let info: Info = {
    url: res.webUrl,
    id: res.id,
  };
  repoInfo[repo.name as string] = info;
}
