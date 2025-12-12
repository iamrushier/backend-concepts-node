// Run with: node load-test/test.js
import http from "http";

function makeRequest(path, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 4000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });

    req.on("error", reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runLoadTest(concurrency = 10, duration = 30000) {
  console.log(
    `\n🚀 Starting load test: ${concurrency} concurrent requests for ${
      duration / 1000
    }s\n`
  );

  const startTime = Date.now();
  let completed = 0;
  let errors = 0;
  const responseTimes = [];
  const pids = new Set();

  async function worker() {
    while (Date.now() - startTime < duration) {
      const reqStart = Date.now();
      try {
        const result = await makeRequest("/process-image", "POST", {});
        const reqDuration = Date.now() - reqStart;
        responseTimes.push(reqDuration);

        const parsed = JSON.parse(result.body);
        pids.add(parsed.pid);
        completed++;
      } catch (err) {
        errors++;
      }
    }
  }

  // Start concurrent workers
  const workers = Array(concurrency)
    .fill(0)
    .map(() => worker());
  await Promise.all(workers);

  // Calculate statistics
  const totalTime = Date.now() - startTime;
  const avgResponse =
    responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  const maxResponse = Math.max(...responseTimes);
  const minResponse = Math.min(...responseTimes);
  const rps = (completed / (totalTime / 1000)).toFixed(2);

  console.log("\n📊 Results:");
  console.log(`   Total Requests:    ${completed}`);
  console.log(`   Failed Requests:   ${errors}`);
  console.log(`   Requests/Second:   ${rps}`);
  console.log(`   Avg Response Time: ${avgResponse.toFixed(2)}ms`);
  console.log(`   Min Response Time: ${minResponse}ms`);
  console.log(`   Max Response Time: ${maxResponse}ms`);
  console.log(
    `   Workers Used:      ${pids.size} (PIDs: ${Array.from(pids).join(", ")})`
  );
  console.log("");
}

// Run test
runLoadTest(20, 30000);
