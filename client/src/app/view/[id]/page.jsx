"use client";
import { useSearchParams, useParams } from "next/navigation";
import ModelViewer from "@/components/ModelViewer";

export default function ViewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const fileId = params.id;

  if (!token || !fileId) return <div>Invalid link.</div>;

  // ← now points to your secure view route:
  const fileUrl = `http://localhost:5000/api/secure/view/${fileId}?token=${token}`;

  return (
    <div style={{ height: "100vh" }}>
      <ModelViewer url={fileUrl} />
    </div>
  );
}
