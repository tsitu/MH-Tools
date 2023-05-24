(function() {
  const fileUtils = require("./file-utils");
  const path = require("path");
  const { Octokit } = require("@octokit/rest");
  const { createActionAuth } = require("@octokit/auth-action");

  /** @type {import('@octokit/rest').Octokit} */
  let api;

  /**
   * Parses datetime data from master/src/bookmarklet HTML
   * @param {{owner: string, repo: string, path: string}} options
   * @returns {Object<string, string>}
   */
  async function fetchTimestamps(options) {
    const bookmarkletResponse = await api.repos.getContent(options);

    const result = {};
    for (const bm of bookmarkletResponse.data) {
      const commits = await api.repos.listCommits({
        owner: options.owner,
        repo: options.repo,
        path: bm.path,
        per_page: 1,
        page: 1,
      });

      // Example Response: 2011-04-14T16:00:49Z
      const date = new Date(commits.data[0].commit.committer.date)
        // en-US -> Apr 14, 2011
        .toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric"
      });

      // transform src/bookmarket/bm-some-name.js -> some_name
      const bookmarklet = path
        .basename(bm.path, ".js")
        .replace("bm-", "")
        .replace("-", "_");

      result[bookmarklet] = date;
    }

    return result;
  }

  (async function main() {
    if (process.env.GITHUB_TOKEN) {
      const auth = createActionAuth();
      const authentication = await auth();
      api = new Octokit({ auth: authentication.token });
      console.log("Using authenticated GitHub API");
    } else {
      api = new Octokit();
      console.log("Using anonymous GitHub API (limit 60 req/hour)");
    }

    console.log("Begin fetchTimestamps routine...");

    const bookmarkletJson = await fetchTimestamps({
      owner: "tsitu",
      repo: "MH-Tools",
      path: "src/bookmarklet",
    }).catch((error) => console.log(error));

    console.log(bookmarkletJson);

    fileUtils.saveJsonFile(
      "data/json/bookmarklet-timestamps.json",
      bookmarkletJson
    );
  })();
})();
