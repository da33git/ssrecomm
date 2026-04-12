interface Props {
  title: string;
  full_description?: string;
  pageHeaderBgImg: string;
  pageHeaderMinVh?: string;
  pageHeaderRadius?: string;
}

export default function PromoSectionLarge({
  title,
  full_description,
  pageHeaderBgImg,
  pageHeaderMinVh,
  pageHeaderRadius,
}: Props) {
  const styles = {
    pageHeader: {
      backgroundImage: 'url(' + pageHeaderBgImg + ')',
      minHeight: pageHeaderMinVh,
      borderRadius: pageHeaderRadius,
    },
  } as const;

  return (
    <>
      <section>
        <div className="page-header py-5 py-md-0 relative overflow-hidden flex items-center bg-cover bg-position-[50%]" style={styles.pageHeader}>
          <span className="mask bg-gradient-dark  bg-linear-to-br opacity-5"></span>
          <div className="container">
            <div className="row justify-content-center flex flex-wrap items-center ">
              <div className="col-lg-8 col-sm-9 text-center mx-auto basis-2/3">
                <h1 className="text-white mb-4 text-5
                xl font-bold text-5xl">{title}</h1>
                {full_description && (
                  <p className="lead text-white mb-sm-6 mb-4text-2xl">
                    {full_description}
                  </p>
                )}
                <a className="btn btn-white btn-lg text-black  bg-white " href="/shop">
                  Show now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
