
"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
  KeyRound,
  MapPin,
  Menu,
  Snowflake,
  Share,
  Star,
  Sun,
  UserRound,
  Wifi,
  X,
} from "lucide-react";

import { listing } from "@/data/listing";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type Overlay = "tour" | "lightbox" | null;
type Panel =
  | "share"
  | "guests"
  | "reserve"
  | "amenities"
  | "reviews"
  | null;

const fallback = "/images/image-fallback.svg";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <span>⌂</span>
          airbnb
        </div>

        <button className="search-pill" type="button">
          <span>Anywhere</span>
          <i />
          <span>Any week</span>
          <i />
          <span>Add guests</span>
          <b>⌕</b>
        </button>

        <div className="header-actions">
          <button type="button">Airbnb your home</button>

          <button
            className="icon-button"
            type="button"
            aria-label="Choose language"
          >
            <Globe size={18} />
          </button>

          <button
            className="profile-pill"
            type="button"
            aria-label="Open account menu"
          >
            <Menu size={18} />
            <UserRound size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

function ReservationCard({
  onPanel,
  confirmed,
  guests,
}: {
  onPanel: (panel: Exclude<Panel, null>) => void;
  confirmed: boolean;
  guests: number;
}) {
  return (
    <aside
      className="reservation-card"
      aria-label="Reserve this stay"
    >
      <div className="price-line">
        <strong>₹{listing.price.toLocaleString()}</strong>
        <span>night</span>
      </div>

      <div className="date-grid">
        <div>
          <small>CHECK-IN</small>
          <strong>12/12/2026</strong>
        </div>

        <div>
          <small>CHECKOUT</small>
          <strong>17/12/2026</strong>
        </div>
      </div>

      <button
        className="guest-row"
        type="button"
        onClick={() => onPanel("guests")}
      >
        <span>
          <small>GUESTS</small>
          <strong>
            {guests} guest{guests === 1 ? "" : "s"}
          </strong>
        </span>

        <ChevronDown size={18} />
      </button>

      <button
        className="reserve-button"
        type="button"
        onClick={() => onPanel("reserve")}
      >
        {confirmed ? "Request sent" : "Reserve"}
      </button>

      <p className="fine-print">
        You won&apos;t be charged yet
      </p>

      <div className="fee-line">
        <span>₹5,680 x 5 nights</span>
        <span>₹28,400</span>
      </div>

      <div className="fee-line">
        <span>Cleaning fee</span>
        <span>₹1,500</span>
      </div>

      <div className="fee-line">
        <span>Airbnb service fee</span>
        <span>₹2,100</span>
      </div>

      <div className="total-line">
        <strong>Total before taxes</strong>
        <strong>₹32,000</strong>
      </div>
    </aside>
  );
}

function Gallery({
  open,
  tour,
}: {
  open: (index: number, opener: HTMLElement) => void;
  tour: (opener: HTMLElement) => void;
}) {
  return (
    <div className="hero-gallery">
      {listing.photos.slice(0, 5).map((photo, index) => (
        <button
          className={`hero-photo hero-photo-${index + 1}`}
          key={photo.id}
          type="button"
          aria-label={`Open photo ${index + 1}: ${photo.alt}`}
          onClick={(event) =>
            open(index, event.currentTarget)
          }
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={1600}
            height={1000}
            unoptimized
            onError={(event) => {
              event.currentTarget.src = fallback;
            }}
          />
        </button>
      ))}

      <button
        className="show-all"
        type="button"
        onClick={(event) =>
          tour(event.currentTarget)
        }
      >
        Show all photos
      </button>
    </div>
  );
}

const photoTourCategories = [
  [
    "living-room-1",
    "Living room 1",
    "Sofa · Air conditioning · Ceiling fan · TV",
    1,
  ],
  [
    "living-room-2",
    "Living room 2",
    "Comfortable seating · Natural light · Wifi",
    6,
  ],
  [
    "full-kitchen",
    "Full kitchen",
    "Kitchen · Refrigerator · Cooking basics",
    4,
  ],
  [
    "bedroom",
    "Bedroom",
    "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Hangers",
    0,
  ],
  [
    "full-bathroom",
    "Full bathroom",
    "Hairdryer · Hot water · Shampoo · Shower gel",
    3,
  ],
  [
    "gym",
    "Gym",
    "Shared fitness area · Exercise equipment",
    7,
  ],
  [
    "exterior",
    "Exterior",
    "Building entrance · Tropical surroundings",
    5,
  ],
  [
    "pool",
    "Pool",
    "Shared pool · Outdoor seating · Sun loungers",
    2,
  ],
] as const;

function PhotoTourSection({
  openLightbox,
}: {
  openLightbox: (index: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);

    window.addEventListener(
      "open-photo-tour-section",
      open
    );

    return () => {
      window.removeEventListener(
        "open-photo-tour-section",
        open
      );
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        document
          .getElementById("photos-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const tourRef = useRef<HTMLElement>(null);

  const [activeCategory, setActiveCategory] =
    useState<string>(
      photoTourCategories[0][0]
    );

  useEffect(() => {
    const sections = photoTourCategories
      .map(([id]) =>
        document.getElementById(
          `photo-category-${id}`
        )
      )
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(
              entry.target.id.replace(
                "photo-category-",
                ""
              )
            );
          }
        }),
      {
        rootMargin:
          "-18% 0px -65% 0px",
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: string) => {
    document
      .getElementById(`photo-category-${id}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className="photo-tour-section"
      id="photos-section"
      ref={tourRef}
      aria-labelledby="photo-tour-heading"
    >
      <h2 id="photo-tour-heading">
        Photo tour
      </h2>

      <div
        className="photo-category-strip"
        aria-label="Photo tour categories"
      >
        {photoTourCategories.map(
          ([id, title, , photoIndex]) => (
            <button
              type="button"
              key={id}
              className={
                activeCategory === id
                  ? "active"
                  : ""
              }
              onClick={() =>
                scrollToCategory(id)
              }
            >
              <Image
                src={
                  listing.photos[photoIndex].src
                }
                alt=""
                width={150}
                height={100}
                unoptimized
              />

              <span>{title}</span>
            </button>
          )
        )}
      </div>

      <div className="photo-tour-groups">
        {photoTourCategories.map(
          (
            [
              id,
              title,
              description,
              photoIndex,
            ],
            categoryIndex
          ) => {
            const supportOne =
              (photoIndex + 1) %
              listing.photos.length;

            const supportTwo =
              (photoIndex + 2) %
              listing.photos.length;

            return (
              <article
                className="photo-tour-group"
                id={`photo-category-${id}`}
                key={id}
              >
                <div className="photo-tour-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>

                <div className="photo-tour-gallery">
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(photoIndex)
                    }
                    aria-label={`Open ${title} photo`}
                  >
                    <Image
                      src={
                        listing.photos[
                          photoIndex
                        ].src
                      }
                      alt={
                        listing.photos[
                          photoIndex
                        ].alt
                      }
                      width={900}
                      height={620}
                      unoptimized
                    />
                  </button>

                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          supportOne
                        )
                      }
                      aria-label={`Open supporting ${title} photo`}
                    >
                      <Image
                        src={
                          listing.photos[
                            supportOne
                          ].src
                        }
                        alt={
                          listing.photos[
                            supportOne
                          ].alt
                        }
                        width={440}
                        height={300}
                        unoptimized
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          supportTwo
                        )
                      }
                      aria-label={`Open second supporting ${title} photo`}
                    >
                      <Image
                        src={
                          listing.photos[
                            supportTwo
                          ].src
                        }
                        alt={
                          listing.photos[
                            supportTwo
                          ].alt
                        }
                        width={440}
                        height={300}
                        unoptimized
                      />
                    </button>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>
    </section>
  );
}

function Details({
  onPanel,
}: {
  onPanel: (
    panel: Exclude<Panel, null>
  ) => void;
}) {
  const [expanded, setExpanded] =
    useState(false);

  const [amenities, setAmenities] =
    useState(false);

  return (
    <div className="detail-sections">
      <section className="facts-section">
        <h2>
          {listing.propertyType} in Candolim,
          India
        </h2>

        <p>
          {listing.guests} guests ·{" "}
          {listing.bedrooms} bedroom ·{" "}
          {listing.beds} bed ·{" "}
          {listing.baths} bathroom
        </p>

        <div className="guest-favourite">
          <Star
            size={17}
            fill="currentColor"
          />
          <strong>Guest favourite</strong>
          <span>
            One of the most loved homes on
            Airbnb
          </span>
        </div>
      </section>

      <section className="feature-list">
        {listing.highlights.map((item) => (
          <div key={item.title}>
            {item.icon === "sun" ? (
              <Sun />
            ) : item.icon === "snow" ? (
              <Snowflake />
            ) : (
              <KeyRound />
            )}

            <span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
          </div>
        ))}
      </section>

      <section className="copy-section">
        <p className="translation-note">
          Some info has been automatically
          translated.{" "}
          <button type="button">
            Show original
          </button>
        </p>

        <p>
          {expanded
            ? `${listing.description} Every detail is arranged to make your Goa stay easy and comfortable.`
            : listing.description}
        </p>

        <button
          className="text-button"
          type="button"
          onClick={() =>
            setExpanded(!expanded)
          }
        >
          {expanded
            ? "Show less"
            : "Show more"}{" "}
          →
        </button>
      </section>

      <section className="sleep-section">
        <h2>Where you&apos;ll sleep</h2>

        <div className="sleep-grid">
          {listing.sleeping.map((room) => (
            <article key={room.title}>
              <Image
                src={room.src}
                alt={room.title}
                width={640}
                height={420}
                unoptimized
              />

              <strong>{room.title}</strong>
              <span>{room.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="amenity-section"
        id="amenities"
      >
        <h2>What this place offers</h2>

        <div className="amenity-grid">
          {(amenities
            ? listing.amenities
            : listing.amenities.slice(0, 6)
          ).map((item, index) => (
            <div key={item}>
              {index % 2 ? (
                <Wifi />
              ) : (
                <BedDouble />
              )}

              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          className="outline-button"
          type="button"
          onClick={() =>
            amenities
              ? setAmenities(false)
              : onPanel("amenities")
          }
        >
          {amenities
            ? "Show fewer amenities"
            : "Show all 50 amenities"}
        </button>
      </section>

      <section className="calendar-section">
        <Calendar />
      </section>

      <section
        className="location-section"
        id="location"
      >
        <h2>Where you&apos;ll be</h2>

        <div className="map-placeholder">
          <MapPin size={27} />
          <span>{listing.location}</span>
        </div>
      </section>

      <section
        className="reviews-section"
        id="reviews"
      >
        <div className="reviews-heading">
          <div>
            <h2>
              <Star
                size={21}
                fill="currentColor"
              />{" "}
              {listing.rating}
            </h2>

            <p>
              Guest favourite ·{" "}
              {listing.reviews} reviews
            </p>
          </div>

          <button
            className="outline-button"
            type="button"
            onClick={() =>
              onPanel("reviews")
            }
          >
            Show all {listing.reviews} reviews
          </button>
        </div>

        <div className="review-cards">
          {listing.reviewsList.map(
            (review) => (
              <article key={review.name}>
                <strong>
                  {review.name} · ★{" "}
                  {review.rating}
                </strong>

                <small>
                  {review.date}
                </small>

                <p>{review.text}</p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="nearby-section">
        <h2>More stays nearby</h2>

        <div className="nearby-grid">
          {listing.nearby.map((stay) => (
            <article key={stay.name}>
              <Image
                src={stay.src}
                alt={stay.name}
                width={500}
                height={320}
                unoptimized
              />

              <strong>{stay.name}</strong>

              <span>
                {stay.location} · ★{" "}
                {stay.rating}
              </span>

              <p>
                ₹{stay.price.toLocaleString()}{" "}
                night
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Calendar() {
  const [month, setMonth] = useState(9);
  const [start, setStart] =
    useState<number | null>(null);
  const [end, setEnd] =
    useState<number | null>(null);

  const days = new Date(
    2026,
    month + 1,
    0
  ).getDate();

  const first = new Date(
    2026,
    month,
    1
  ).getDay();

  const nights =
    start &&
    end &&
    end > start
      ? end - start
      : 0;

  return (
    <div className="calendar">
      <div className="calendar-heading">
        <div>
          <h2>
            {nights
              ? `${nights} nights in Candolim`
              : "Select your dates"}
          </h2>

          <p>
            Add your travel dates for exact
            pricing
          </p>
        </div>

        <div>
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setMonth(
                Math.max(0, month - 1)
              )
            }
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setMonth(
                Math.min(11, month + 1)
              )
            }
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <h3>October 2026</h3>

      <div className="calendar-days">
        {Array.from(
          { length: first },
          (_, index) => (
            <span
              key={`blank-${index}`}
            />
          )
        )}

        {Array.from(
          { length: days },
          (_, index) => {
            const day = index + 1;

            return (
              <button
                key={day}
                type="button"
                className={`${day === start ||
                  day === end
                  ? "selected"
                  : ""
                  } ${start &&
                    end &&
                    day > start &&
                    day < end
                    ? "between"
                    : ""
                  }`}
                onClick={() =>
                  !start || end
                    ? (setStart(day),
                      setEnd(null))
                    : day > start
                      ? setEnd(day)
                      : null
                }
              >
                {day}
              </button>
            );
          }
        )}
      </div>

      {(start || end) && (
        <button
          className="text-button"
          type="button"
          onClick={() => {
            setStart(null);
            setEnd(null);
          }}
        >
          Clear dates
        </button>
      )}
    </div>
  );
}

function LowerSections({
  onPanel,
}: {
  onPanel: (
    panel: Exclude<Panel, null>
  ) => void;
}) {
  const [
    neighbourhoodExpanded,
    setNeighbourhoodExpanded,
  ] = useState(false);

  const [nearbyPage, setNearbyPage] =
    useState(0);

  const [hostMessage, setHostMessage] =
    useState(false);

  const visibleNearby =
    listing.nearby.slice(
      nearbyPage * 2,
      nearbyPage * 2 + 2
    );

  return (
    <>
      <section className="neighbourhood-section">
        <p>
          Exact location will be provided
          after booking.
        </p>

        <h2>
          Neighbourhood highlights
        </h2>

        <p>
          Located in the heart of Candolim,
          Amor de Goa offers a peaceful stay
          with easy access to beaches, cafés,
          and popular attractions.
        </p>

        {neighbourhoodExpanded && (
          <p>
            Spend the morning at Candolim
            beach, explore nearby cafés, or
            head into central Goa for an evening
            of food and music.
          </p>
        )}

        <button
          className="text-button"
          type="button"
          onClick={() =>
            setNeighbourhoodExpanded(
              !neighbourhoodExpanded
            )
          }
        >
          {neighbourhoodExpanded
            ? "Show less"
            : "Show more"}{" "}
          →
        </button>
      </section>

      <section className="meet-host-section">
        <h2>Meet your host</h2>

        <div className="host-layout">
          <div className="host-card">
            <div className="host-avatar">
              M
            </div>

            <strong>{listing.host}</strong>

            <span>Host</span>

            <span>
              1,463 Reviews · 4.68 ★ · 2 Years
              hosting
            </span>
          </div>

          <div>
            <h3>Co-Hosts</h3>

            <div className="cohost-grid">
              {[
                "Sharath",
                "Aman Dev Pahwa",
                "Maria Karen Priyanka",
                "Simran",
                "Pallavi",
                "Sanyukta",
                "Shruti",
                "Amisha",
              ].map((name) => (
                <span key={name}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="host-details-section">
        <h2>Host details</h2>

        <p>Response rate: 100%</p>
        <p>Responds within an hour</p>
        <p>Born in the 80s</p>
        <p>
          Where I went to school: NICMAR GOA
        </p>

        <button
          className="outline-button"
          type="button"
          onClick={() =>
            setHostMessage(!hostMessage)
          }
        >
          Message host
        </button>

        {hostMessage && (
          <p className="panel-success">
            Message panel ready. We&apos;ll
            connect you with {listing.host}.
          </p>
        )}

        <p className="payment-note">
          To help protect your payment, always
          use Airbnb to send money and
          communicate with hosts.
        </p>
      </section>

      <section className="things-section">
        <h2>Things to know</h2>

        <div className="things-grid">
          <details>
            <summary>
              Cancellation policy{" "}
              <ChevronDown />
            </summary>

            <p>
              Free cancellation before 17
              October. Cancel before check-in on
              18 October for a partial refund.
            </p>

            <button
              type="button"
              className="text-button"
            >
              Learn more
            </button>
          </details>

          <details>
            <summary>
              House rules <ChevronDown />
            </summary>

            <p>
              Check-in after 2:00 pm · Checkout
              before 11:00 am · 3 guests maximum
            </p>

            <button
              type="button"
              className="text-button"
            >
              Learn more
            </button>
          </details>

          <details>
            <summary>
              Safety & property{" "}
              <ChevronDown />
            </summary>

            <p>
              Carbon monoxide alarm not reported
              · Smoke alarm not reported ·
              Exterior security cameras on
              property
            </p>

            <button
              type="button"
              className="text-button"
            >
              Learn more
            </button>
          </details>
        </div>
      </section>

      <section className="nearby-section">
        <div className="nearby-heading">
          <h2>More stays nearby</h2>

          <div>
            <button
              type="button"
              aria-label="Previous nearby stays"
              disabled={nearbyPage === 0}
              onClick={() =>
                setNearbyPage(
                  Math.max(
                    0,
                    nearbyPage - 1
                  )
                )
              }
            >
              <ChevronLeft />
            </button>

            <span>
              {nearbyPage + 1} / 2
            </span>

            <button
              type="button"
              aria-label="Next nearby stays"
              disabled={nearbyPage === 1}
              onClick={() =>
                setNearbyPage(
                  Math.min(
                    1,
                    nearbyPage + 1
                  )
                )
              }
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="nearby-grid">
          {visibleNearby.map((stay) => (
            <article key={stay.name}>
              <Image
                src={stay.src}
                alt={stay.name}
                width={500}
                height={320}
                unoptimized
              />

              <strong>{stay.name}</strong>

              <span>
                {stay.location} · ★{" "}
                {stay.rating}
              </span>

              <p>
                ₹{stay.price.toLocaleString()}{" "}
                night
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function StickyNav({
  onPanel,
  onPhotos,
}: {
  onPanel: (
    panel: Exclude<Panel, null>
  ) => void;
  onPhotos: () => void;
}) {
  const [active, setActive] =
    useState("photos");

  useEffect(() => {
    const ids = [
      "photos-section",
      "amenities",
      "reviews-section",
      "location-section",
    ];

    const observer =
      new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          }),
        {
          rootMargin:
            "-18% 0px -65% 0px",
        }
      );

    ids.forEach((id) => {
      const section =
        document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () =>
      observer.disconnect();
  }, []);

  return (
    <nav className="sticky-nav">
      <div className="sticky-tabs">
        {[
          ["Photos", "photos-section"],
          ["Amenities", "amenities"],
          ["Reviews", "reviews-section"],
          ["Location", "location-section"],
        ].map(([label, id]) => (
          <a
            className={
              active === id
                ? "active"
                : ""
            }
            href={`#${id}`}
            key={id}
            onClick={
              id === "photos-section"
                ? (event) => {
                    event.preventDefault();
                    onPhotos();
                  }
                : undefined
            }
          >
            {label}
          </a>
        ))}
      </div>

      <div className="sticky-summary">
        <strong>
          ₹{listing.price.toLocaleString()}
        </strong>

        <span>
          {" "}
          night · ★ {listing.rating}
        </span>

        <button
          type="button"
          onClick={() =>
            onPanel("reserve")
          }
        >
          Reserve
        </button>
      </div>
    </nav>
  );
}

function Panel({
  panel,
  close,
  setGuests,
  onReserve,
}: {
  panel: Exclude<Panel, null>;
  close: () => void;
  setGuests: (count: number) => void;
  onReserve: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [count, setCount] =
    useState(1);

  useFocusTrap(true, ref);
  useBodyScrollLock(true);

  useEffect(() => {
    const onKey = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      document.removeEventListener(
        "keydown",
        onKey
      );
  }, [close]);

  const title =
    panel === "amenities"
      ? "What this place offers"
      : panel === "reviews"
        ? "Reviews"
        : panel === "guests"
          ? "Guests"
          : panel === "reserve"
            ? "Request to reserve"
            : "Share this place";

  return (
    <div className="panel-backdrop">
      <div
        className="action-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        ref={ref}
      >
        <button
          className="panel-close"
          type="button"
          aria-label={`Close ${title}`}
          onClick={close}
        >
          <X />
        </button>

        <h2 id="panel-title">
          {title}
        </h2>

        {panel === "guests" && (
          <>
            <div className="stepper">
              <button
                type="button"
                aria-label="Remove guest"
                disabled={count === 1}
                onClick={() => {
                  const next =
                    count - 1;

                  setCount(next);
                  setGuests(next);
                }}
              >
                −
              </button>

              <strong>{count}</strong>

              <button
                type="button"
                aria-label="Add guest"
                onClick={() => {
                  const next =
                    count + 1;

                  setCount(next);
                  setGuests(next);
                }}
              >
                +
              </button>
            </div>

            <button
              className="panel-primary"
              type="button"
              onClick={close}
            >
              Done
            </button>
          </>
        )}

        {panel === "reserve" && (
          <>
            <p>
              Your request is ready for
              review. This demo does not
              process payment.
            </p>

            <button
              className="panel-primary"
              type="button"
              onClick={() => {
                onReserve();
                close();
              }}
            >
              Request to reserve
            </button>
          </>
        )}

        {panel === "amenities" && (
          <div className="panel-options">
            {listing.amenities.map(
              (item) => (
                <button
                  type="button"
                  key={item}
                  onClick={close}
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}

        {panel === "reviews" && (
          <div className="panel-options">
            {listing.reviewsList.map(
              (review) => (
                <article
                  key={review.name}
                >
                  <strong>
                    {review.name} · ★{" "}
                    {review.rating}
                  </strong>

                  <p>
                    {review.text}
                  </p>
                </article>
              )
            )}
          </div>
        )}

        {panel === "share" && (
          <>
            <p>
              Share this listing with
              friends and family.
            </p>

            <button
              className="panel-primary"
              type="button"
              onClick={close}
            >
              Copy link
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function GalleryDialog({
  overlay,
  close,
  openLightbox,
  selected,
  setSelected,
}: {
  overlay: Exclude<
    Overlay,
    null
  >;
  close: () => void;
  openLightbox: (
    index: number,
    fromTour?: boolean
  ) => void;
  selected: number;
  setSelected: (
    value:
      | number
      | ((current: number) => number)
  ) => void;
}) {
  const ref =
    useRef<HTMLDivElement>(null);

  useFocusTrap(true, ref);
  useBodyScrollLock(true);

  useEffect(() => {
    const onKey = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        close();
      }

      if (
        overlay === "lightbox" &&
        event.key === "ArrowRight"
      ) {
        setSelected(
          (current) =>
            (current + 1) %
            listing.photos.length
        );
      }

      if (
        overlay === "lightbox" &&
        event.key === "ArrowLeft"
      ) {
        setSelected(
          (current) =>
            (current - 1 +
              listing.photos.length) %
            listing.photos.length
        );
      }
    };

    document.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      document.removeEventListener(
        "keydown",
        onKey
      );
  }, [
    close,
    overlay,
    setSelected,
  ]);

  if (overlay === "tour") {
    return (
      <div
        className="overlay tour-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Photo tour"
        ref={ref}
      >
        <button
          className="close-button dark"
          type="button"
          onClick={close}
          aria-label="Close photo tour"
        >
          <X />
        </button>

        <div className="tour-content">
          <h2>Photo tour</h2>

          <div className="tour-grid">
            {listing.photos.map(
              (photo, index) => (
                <button
                  type="button"
                  key={photo.id}
                  onClick={() =>
                    openLightbox(
                      index,
                      true
                    )
                  }
                  aria-label={`View ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={900}
                    height={600}
                    unoptimized
                  />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  const photo =
    listing.photos[selected];

  return (
    <div
      className="overlay lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      ref={ref}
    >
      <button
        className="close-button light"
        type="button"
        onClick={close}
        aria-label="Close photo viewer"
      >
        <X />
      </button>

      <span className="lightbox-count">
        {selected + 1} /{" "}
        {listing.photos.length}
      </span>

      <button
        className="lightbox-nav previous"
        type="button"
        aria-label="Previous photo"
        onClick={() =>
          setSelected(
            (current) =>
              (current -
                1 +
                listing.photos.length) %
              listing.photos.length
          )
        }
      >
        <ArrowLeft />
      </button>

      <Image
        className="lightbox-image"
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={800}
        unoptimized
      />

      <button
        className="lightbox-nav next"
        type="button"
        aria-label="Next photo"
        onClick={() =>
          setSelected(
            (current) =>
              (current + 1) %
              listing.photos.length
          )
        }
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default function ListingExperience() {
  const [overlay, setOverlay] =
    useState<Overlay>(null);

  const [panel, setPanel] =
    useState<Panel>(null);

  const [selected, setSelected] =
    useState(0);

  const [guests, setGuests] =
    useState(1);

  const [confirmed, setConfirmed] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [sticky, setSticky] =
    useState(false);

  const opener =
    useRef<HTMLElement | null>(null);

  const openPanel = (
    next: Exclude<Panel, null>
  ) => {
    setPanel(next);
  };

  const closePanel = () => {
    setPanel(null);
  };

  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 460);
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    const reviews =
      document.querySelector(
        ".reviews-section"
      );

    const location =
      document.querySelector(
        ".location-section"
      );

    reviews?.setAttribute(
      "id",
      "reviews-section"
    );

    location?.setAttribute(
      "id",
      "location-section"
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  const openTour = (
    element: HTMLElement
  ) => {
    opener.current = element;
    setOverlay("tour");
  };

  const openLightbox = (
    index: number,
    fromTour = false
  ) => {
    if (!fromTour) {
      opener.current =
        document.activeElement as HTMLElement;
    }

    setSelected(index);
    setOverlay("lightbox");
  };

  /*
   * FIX:
   * StickyNav requires an onPhotos callback.
   * This function opens the Photo Tour section
   * when the sticky "Photos" tab is clicked.
   */
  const openPhotos = () => {
    const photosSection =
      document.getElementById(
        "photos-section"
      );

    if (photosSection) {
      photosSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      document
        .getElementById("photos")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }

    window.dispatchEvent(
      new Event(
        "open-photo-tour-section"
      )
    );
  };

  const closeOverlay = () => {
    setOverlay(null);

    requestAnimationFrame(() => {
      opener.current?.focus();
    });
  };

  return (
    <>
      <Header />

      {sticky && (
        <StickyNav
          onPanel={openPanel}
          onPhotos={openPhotos}
        />
      )}

      <main className="page-shell">
        <div className="listing-heading">
          <div>
            <h1>{listing.title}</h1>

            <div className="subline">
              <MapPin size={15} />{" "}
              {listing.propertyType} in{" "}
              {listing.location} ·{" "}
              <Star
                size={14}
                fill="currentColor"
              />{" "}
              {listing.rating} ·{" "}
              {listing.reviews} reviews
            </div>
          </div>

          <div className="heading-actions">
            <button
              type="button"
              onClick={() =>
                openPanel("share")
              }
            >
              <Share size={17} /> Share
            </button>

            <button
              type="button"
              aria-pressed={saved}
              onClick={() =>
                setSaved(!saved)
              }
            >
              <Heart
                size={17}
                fill={
                  saved
                    ? "currentColor"
                    : "none"
                }
              />{" "}
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        <div id="photos">
          <Gallery
            open={(index) =>
              openLightbox(index)
            }
            tour={openTour}
          />
        </div>

        <PhotoTourSection
          openLightbox={openLightbox}
        />

        <div className="content-layout">
          <Details
            onPanel={openPanel}
          />

          <LowerSections
            onPanel={openPanel}
          />

          <ReservationCard
            onPanel={openPanel}
            confirmed={confirmed}
            guests={guests}
          />
        </div>
      </main>

      <footer className="site-footer">
        © 2025 Airbnb clone recreation
      </footer>

      {overlay && (
        <GalleryDialog
          overlay={overlay}
          close={closeOverlay}
          openLightbox={openLightbox}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      {panel && (
        <Panel
          panel={panel}
          close={closePanel}
          setGuests={setGuests}
          onReserve={() =>
            setConfirmed(true)
          }
        />
      )}
    </>
  );
}
```

### What was fixed

The original error was caused by this:

```tsx
<StickyNav onPanel={openPanel} />
```

It is now:

```tsx
<StickyNav
  onPanel={openPanel}
  onPhotos={openPhotos}
/>
```

And this function was added:

```tsx
const openPhotos = () => {
  const photosSection =
    document.getElementById("photos-section");

  if (photosSection) {
    photosSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  window.dispatchEvent(
    new Event("open-photo-tour-section")
  );
};
