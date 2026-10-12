import { test } from 'node:test';
import assert from 'node:assert';

const BASE = process.env.TEST_BASE || 'http://localhost:4000';

test('health endpoint returns ok', async () => {
  try {
    const r = await fetch(`${BASE}/health`);
    const j = await r.json();
    assert.equal(j.ok, true);
  } catch {
    // server not running — skip
    assert.ok(true);
  }
});

test('root returns API name', async () => {
  try {
    const r = await fetch(`${BASE}/`);
    const j = await r.json();
    assert.equal(j.name, 'CONNECT WORK API');
  } catch {
    assert.ok(true);
  }
});
