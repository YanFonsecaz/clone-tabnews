import database from "infra/database.js";

async function status(request, response) {
  const updatedAT = new Date().toISOString();
  const queryVersion = "Show server_version;";
  const versionBanco = await database.query(queryVersion);
  const queryMaxConect = await database.query("SHOW max_connections;");
  const maxConect = queryMaxConect.rows[0].max_connections;

  const dataBaseName = process.env.POSTGRES_DB;
  const queryCurrentConect = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity Where datname = $1;",
    values: [dataBaseName],
  });
  const currentConect = queryCurrentConect.rows[0].count;

  response.status(200).json({
    updated_at: updatedAT,
    dependencies: {
      version: versionBanco.rows[0].server_version,
      max_connections: parseInt(maxConect),
      current_connections: currentConect,
    },
  });
}

export default status;
