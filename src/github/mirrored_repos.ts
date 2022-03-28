import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import * as gitlabRepos from '../gitlab/repos';

for (const [k, v] of Object.entries(gitlabRepos.repoInfo)) {
  if (v.mirrored) {
    let _ = new github.Repository(k, {
      name: k,
      description: pulumi.interpolate`Mirror of https://gitlab.infraunlimited.tech${v.url.apply(
        (url) => new URL(url).pathname
      )}`,
      visibility: 'public',
      hasDownloads: true,
    });
  }
}
