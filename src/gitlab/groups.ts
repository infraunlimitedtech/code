import * as gitlab from '@pulumi/gitlab';
import * as pulumi from '@pulumi/pulumi';

const groupList: gitlab.GroupArgs[] = [
  {
    name: 'infraOps',
    description: 'InfraUnlimited Operation Team',
    path: 'infraOps'
  },
  {
    name: 'infra',
    description: 'InfraUnlimited infra',
    parentId: 2,
    path: 'infra'
  },
  {
    name: 'ansible',
    description: 'InfraUnlimited ansible infrastructure',
    parentId: 2,
    path: 'ansible'
  },
  {
    name: 'os-tools',
    description: 'Tools for supported operation systems',
    parentId: 2,
    path: 'os-tools'
  },
];

interface Info {
  id: pulumi.Output<string>;
  path: pulumi.Output<string>;
  url: pulumi.Output<string>;
}

type Repositories = {
//  [key: string]: pulumi.OutputObject<Group>;
  [key: string]: Info;
};

export const groupInfo: Repositories = {};

for (let settings of groupList) {
  let res = new gitlab.Group(settings.name as string, settings);

  console.log(typeof res);
  let info: Info = {
    id: res.id,
    path: res.fullPath,
    url: res.webUrl,
  };
  groupInfo[settings.name as string] = info;
  //groupInfo[settings.name as string] = res;
}
