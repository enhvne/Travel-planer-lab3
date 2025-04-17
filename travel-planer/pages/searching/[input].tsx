import { useRouter } from 'next/router';

const SearchingResult = () => {
  const router = useRouter();
  const { input } = router.query;
  const inputwq = "wsg";

  return (
    <div>
      <h1>Хайлт: {input}</h1>
      {/* энд чи id ашиглаад fetch хийж болно */}
    </div>
  );
};

export default SearchingResult;
