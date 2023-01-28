import ContentLoader from "react-content-loader";

function ProductLoader({ ...props }) {
  return (
    <div style={{ backgroundColor: "#ddd", borderRadius: 10, zIndex: 30 }}>
      <ContentLoader
        speed={2}
        width={320}
        height={468}
        viewBox="0 0 320 468"
        backgroundColor="#f3f3f3"
        foregroundColor="#dddddd"
        {...props}
      >
        <rect x="10" y="10" rx="10" ry="10" width="300" height="240" />
        <rect x="10" y="270" rx="10" ry="10" width="300" height="32" />
        <rect x="10" y="314" rx="10" ry="10" width="300" height="13" />
        <rect x="10" y="337" rx="10" ry="10" width="300" height="13" />
        <rect x="10" y="358" rx="10" ry="10" width="300" height="13" />
        <rect x="10" y="383" rx="10" ry="10" width="149" height="47" />
        <rect x="10" y="447" rx="10" ry="10" width="141" height="18" />
        <rect x="193" y="447" rx="10" ry="10" width="107" height="16" />
      </ContentLoader>
    </div>
  );
}

export default ProductLoader;
