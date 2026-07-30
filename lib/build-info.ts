/* Identifies the running build, so a deploy can be verified from the outside
   without opening the deployment dashboard:

     curl -s https://smartoneglobal.com/ | grep x-build

   Coolify injects SOURCE_COMMIT into the container, so the value is normally
   the commit that is live. When it is missing – a local run, or another host –
   we fall back to the moment the server process started. That is not a commit
   id, but it still changes on every redeploy, which is what the check needs.

   Module-level evaluation is deliberate: it runs once when the server boots,
   not per request, so the marker stays stable for the life of the container. */
const commit = process.env.SOURCE_COMMIT?.trim();

export const BUILD_ID = commit
  ? commit.slice(0, 7)
  : `started-${new Date().toISOString().replace(/\.\d+Z$/, "Z")}`;
