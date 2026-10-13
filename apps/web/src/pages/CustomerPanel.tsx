import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listWorkers } from '../lib/workers';
import type { WorkerProfile } from '../shared/districts';
import { CATEGORIES } from '../shared/districts';

type Coords = { lat: number; lng: number };

// Approximate block coordinates (Anantnag + Kulgam)
const BLOCK_COORDS: Record<string, Coords> = {
  Achabal: { lat: 33.6776, lng: 75.2247 },
  Anantnag: { lat: 33.7311, lng: 75.1487 },
  Bijbehara: { lat: 33.7721, lng: 75.1042 },
  Dooru: { lat: 33.5670, lng: 75.2330 },
  Kokernag: { lat: 33.5968, lng: 75.3170 },
  Mattan: { lat: 33.7500, lng: 75.2100 },
  Pahalgam: { lat: 34.0161, lng: 75.3167 },
  Qazigund: { lat: 33.5900, lng: 75.1600 },
  Shangus: { lat: 33.6500, lng: 75.2800 },
  Srigufwara: { lat: 33.7200, lng: 75.2500 },
  Kulgam: { lat: 33.6444, lng: 75.0194 },
  Devsar: { lat: 33.6100, lng: 75.0300 },
  Frisal: { lat: 33.6800, lng: 75.0800 },
  Yaripora: { lat: 33.6600, lng: 75.0500 },
  'D.H.Pora': { lat: 33.5900, lng: 75.0400 },
  Qaimoh: { lat: 33.6300, lng: 75.0800 },
};

function haversine(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function CustomerPanel() {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [filtered, setFiltered] = useState<WorkerProfile[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [nearOnly, setNearOnly] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    listWorkers(100)
      .then((list) => {
        setWorkers(list);
        setFiltered(list);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let out = workers;
    if (category !== 'all') out = out.filter((w) => w.category === category);
    if (nearOnly && coords) {
      out = out.filter((w) => {
        const c = BLOCK_COORDS[w.block];
        if (!c) return false;
        return haversine(coords, c) <= 3;
      });
      out = [...out].sort((a, b) => {
        const ca = BLOCK_COORDS[a.block];
        const cb = BLOCK_COORDS[b.block];
        if (!ca || !cb) return 0;
        return haversine(coords, ca) - haversine(coords, cb);
      });
    }
    setFiltered(out);
  }, [workers, category, nearOnly, coords]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setErr('Geolocation not supported');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setNearOnly(true);
        setLocating(false);
      },
      (e) => {
        setErr(e.message);
        setLocating(false);
      }
    );
  };

  const distanceLabel = (w: WorkerProfile) => {
    if (!coords) return null;
    const c = BLOCK_COORDS[w.block];
    if (!c) return null;
    const km = haversine(coords, c);
    return km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Find Workers</h1>
        <button
          className={nearOnly ? 'btn' : 'btn btn--ghost'}
          onClick={requestLocation}
          disabled={locating}
        >
          {locating ? 'Locating…' : nearOnly ? '✓ Near me (3 km)' : '📍 Near me (3 km)'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', paddingBottom: 4 }}>
        <button
          className={category === 'all' ? 'btn' : 'btn btn--ghost'}
          onClick={() => setCategory('all')}
          style={{ whiteSpace: 'nowrap' }}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={category === c ? 'btn' : 'btn btn--ghost'}
            onClick={() => setCategory(c)}
            style={{ whiteSpace: 'nowrap' }}
          >
            {c}
          </button>
        ))}
      </div>

      {err && (
        <p style={{ color: 'var(--cw-danger)', marginTop: 12 }}>{err}</p>
      )}

      {loading ? (
        <p style={{ color: 'var(--cw-text-muted)', marginTop: 24 }}>Loading workers…</p>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ marginTop: 24, textAlign: 'center' }}>
          <h3>No workers found</h3>
          <p style={{ color: 'var(--cw-text-muted)' }}>
            {nearOnly
              ? 'No workers within 3 km. Try turning off the Near me filter.'
              : 'No workers in this category yet. Ask workers to sign up.'}
          </p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 24 }}>
          {filtered.map((w) => (
            <Link key={w.uid} to={`/worker/${w.uid}`} className="card" style={{ color: "inherit", display: "block" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: 4 }}>{w.name}</h3>
                  <div style={{ fontSize: 13, color: 'var(--cw-text-muted)' }}>
                    {w.category} • {w.block}, {w.district}
                  </div>
                </div>
                <span className="badge">₹{w.dailyWage}/day</span>
              </div>
              {w.experienceYears > 0 && (
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  {w.experienceYears} year{w.experienceYears > 1 ? 's' : ''} experience
                </div>
              )}
              {w.bio && (
                <p style={{ marginTop: 8, fontSize: 13, color: 'var(--cw-text-muted)' }}>
                  {w.bio}
                </p>
              )}
              <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <a href={`tel:${w.phone}`} className="btn" style={{ flex: 1, textAlign: 'center' }}>
                  Call
                </a>
                {distanceLabel(w) && (
                  <span style={{ fontSize: 12, color: 'var(--cw-text-dim)' }}>
                    {distanceLabel(w)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
