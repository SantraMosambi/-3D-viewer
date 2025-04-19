export default function Home() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>3D Model Viewer</h1>
      <p>Upload a 3D file and view it in the browser.</p>
      <a href="/upload" style={{ fontSize: "1.2rem", color: "blue" }}>
        Go to Upload Page →
      </a>
    </main>
  );
}
