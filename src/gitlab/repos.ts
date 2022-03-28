import * as gitlab from '@pulumi/gitlab';
import * as pulumi from '@pulumi/pulumi';
import * as groups from './groups';

const username = 'infraunlimitedBot';

const cfg = new pulumi.Config();
const token = cfg.requireSecret('mirrorToken');

interface Mirror {
  enabled: boolean;
}

interface Repo {
  args: gitlab.ProjectArgs;
  githubMirror?: Mirror;
}

export const repoList: Repo[] = [
  {
    args: {
      name: 'infra-proposals',
      description: 'Proposals and experiments for infra',
      namespaceId: groups.groupInfo['infra'].id.apply((id) => +id),
    },
  },
  {
    args: {
      name: 'pulumi-crosswalks',
      description:
        'Infraunlimited infrastructure with Pulumi. Loosely based on pulumi crosswalks',
      namespaceId: groups.groupInfo['infra'].id.apply((id) => +id),
      visibilityLevel: 'public',
    },
    githubMirror: {
      enabled: true,
    },
  },
  {
    args: {
      name: 'code',
      description: 'tools for managing git repositories with IaC',
      namespaceId: groups.groupInfo['infra'].id.apply((id) => +id),
      visibilityLevel: 'public',
    },
    githubMirror: {
      enabled: true,
    },
  },
  {
    args: {
      name: 'ansible-role-vault',
      description: 'Ansible role and tools for install/manage Hashi vault',
      namespaceId: groups.groupInfo['ansible'].id.apply((id) => +id),
      visibilityLevel: 'public',
    },
    githubMirror: {
      enabled: true,
    },
  },
  {
    args: {
      name: 'os-images',
      description:
        'Scripts for building iso, vagrant boxes, docker images, cloud images, etc',
      namespaceId: groups.groupInfo['os-tools'].id.apply((id) => +id),
      visibilityLevel: 'public',
    },
    githubMirror: {
      enabled: true,
    },
  },
];

interface Info {
  url: pulumi.Output<string>;
  id: pulumi.Output<string>;
  mirrored: boolean;
}

type Repositories = {
  [key: string]: Info;
};

export const repoInfo: Repositories = {};

for (let repo of repoList) {
  let r = { ...repo.args };
  let res = new gitlab.Project(r.name as string, r);

  if (repo.githubMirror == undefined) {
    repo.githubMirror = {} as Mirror;
  }
  let info: Info = {
    url: res.webUrl,
    id: res.id,
    mirrored: repo.githubMirror.enabled,
  };
  repoInfo[r.name as string] = info;

  if (repo.githubMirror.enabled) {
    let url = pulumi.interpolate`https://${username}:${token}@github.com/infraunlimitedtech/${res.name}`;

    let _ = new gitlab.ProjectMirror(
      r.name as string,
      {
        project: res.id,
        url: pulumi.secret(url),
        //Url always changed.
      },
      { ignoreChanges: ['url'] }
    );
  }
}
