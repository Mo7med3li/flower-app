function OccasionSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 pb-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-20 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
        ></div>
      ))}
    </div>
  );
}
export default OccasionSkeleton;
