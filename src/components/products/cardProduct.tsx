import ProductBadge from './productBadge';

interface Props {
  thumb_src: string;
  thumb_alt: string;
  title: string;
  description?: string;
  price?: number;
  color?: string;
  colors?: string[];
  position: string;
  href: string;
}

export default function CardProduct({
  thumb_src,
  thumb_alt,
  title,
  description,
  price,
  color,
  colors,
  position,
  href,
}: Props) {
  const classList = 'card-body ' + 'text-' + position;

  return (
    <>
      <div className="card card-product   border-2 border-purple-700 mb-5 shadow-xs p-4 m-2">
        <a href={href}>
          <div className="h-300px">
            <img
              className="w-100 h-100 rounded-top"
              src={thumb_src}
              alt={thumb_alt}
            />
          </div>
          <div className={classList}>
            {color && <p className="text-sm mb-1 text-body">{color}</p>}
            {title && <h5 className="font-weight-bold font-semibold text-xl">{title}</h5>}

            {description && <p className="text-body text-sm p-2 opacity-50">{description}</p>}

            {price && (
              <p className=" text-sm text-body mt-1 mb-3">
                ${price?.toFixed(2)}
              </p>
            )}

            {colors && <ProductBadge colors={colors} />}

            {!(description || colors || color) && (
              <a href={href} className="font-weight-normal text-body text-sm">
                Shop Now
              </a>
            )}
          </div>
        </a>
      </div>
    </>
  );
}
