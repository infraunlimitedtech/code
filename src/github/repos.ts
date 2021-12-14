import * as github from '@pulumi/github';

export const repoList: github.RepositoryArgs[] = [
  {
    name: 'ansible-role-vault',
    description:
      'Mirror of https://gitlab.infraunlimited.tech/infraOps/ansible/ansible-role-vault',
    visibility: 'public',
  },
];

for (let repo of repoList) {
  let r = { ...repo };
  if (!r.hasOwnProperty('hasDownloads')) r.hasDownloads = true;
  if (!r.hasOwnProperty('hasIssues')) r.hasIssues = true;

  let _ = new github.Repository(r.name as string, r);
}
