import * as gitlab from '@pulumi/gitlab';
import * as pulumi from '@pulumi/pulumi';
import * as gitlabRepos from './repos';

const username = 'infraunlimitedBot';

const cfg = new pulumi.Config();
const token = cfg.requireSecret('mirrorToken');

interface Info {
  name: string;
  project: pulumi.Output<string>;
  url: pulumi.Output<string>;
}

export const repoList: Info[] = [
  {
    name: 'ansible-role-vault',
    project: gitlabRepos.repoInfo['ansible-role-vault'].id,
    url: pulumi.interpolate`http://${username}:${token}@github.com/infraunlimitedtech/ansible-role-vault`,
  },
];

for (let m of repoList) {
  let _ = new gitlab.ProjectMirror(
    m.name,
    {
      project: m.project,
      url: pulumi.secret(m.url),
      // Url always changed.
    },
    { ignoreChanges: ['url'] }
  );
}
