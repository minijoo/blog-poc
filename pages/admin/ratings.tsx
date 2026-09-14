import { useEffect, useState } from "react";
import { JordysAPI } from "../../lib/jordys-api";
import { AuthenticationError, Rating } from "../../interfaces/jordys-api";
import Layout from "../../components/layout";
import Head from "next/head";

export async function getStaticProps() {
  return { props: { ip: process.env.IP || "" } };
}

export default function Ratings({ ip }) {
  const Jordys_API = new JordysAPI(ip);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [openId, setOpenId] = useState<string>(null);
  const [greenPopoverMessage, setGreenMessage] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [redPopoverMessage, setRedMessage] = useState("");
  const [deleted, setDeleted] = useState<Rating>(null);
  const [sortByWhat, setSortByWhat] = useState<string>('last');
  useEffect(() => {
    Jordys_API.retrieveRatings()
      .then((ratings) => {
        const sorted = ratings.sort(compareEditDate)
        setRatings(sorted);
        const cats = new Set<string>();
        ratings.forEach(r => r.category && cats.add(r.category));
        setCategories(Array.from(cats));
      })
      .catch((err) => {
        if (err instanceof AuthenticationError) {
          console.log("You are not authenticated");
          alert(
            "This page requires authentication. Upon acknowledgement, you will be immediately rerouted to the login page."
          );
          window.location.replace("/admin/login?redirectPath=admin");
          return;
        }
        console.log("an error occurred retrieving ratings. ", err);
      });
  }, []);

  useEffect(() => {
    sortBy(sortByWhat);
  }, [sortByWhat]);

  async function handleNewRating() {
    const el = document.getElementById('new-rating') as any;
    const cat = resolveCategory(el);

    const rating: Rating = {
      name: (el.querySelector('input[name="name"]') as HTMLInputElement).value,
      rating: (el.querySelector('input[name="rating"]') as HTMLInputElement).value as any,
      link: (el.querySelector('input[name="link"]') as HTMLInputElement).value,
      location: (el.querySelector('input[name="location"]') as HTMLInputElement).value,
      category: cat,
      tags: (el.querySelector('input[name="tags"]') as HTMLInputElement).value?.split(','),
      imgUrl: (el.querySelector('input[name="imgurl"]') as HTMLInputElement).value,
      notes: (el.querySelector('input[name="notes"]') as HTMLInputElement).value,
      editDate: (new Date()).toString()
    }

    try {
      const resp = await Jordys_API.upsertRating(rating)
      rating._id = resp._id;
      setGreenMessage("saved rating successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();

      setRatings(current => {
        const next = [...current]
        next.push(rating)
        return next;
      })
      sortBy(sortByWhat);
    } catch (err) {
      setRedMessage("Error saving rating");
      console.log(err);
    }
  }

  async function handleRatingDelete(event, i: number) {
    const id = event.currentTarget.parentElement.parentElement.children[0].id;
    try {
      await Jordys_API.deleteRating(id)
      setGreenMessage("deleted rating successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();

      setDeleted(ratings.splice(i, 1)[0]);
      setRatings(current => {
        const next = [...current]
        return next;
      })
    } catch (err) {
      setRedMessage("Error deleting rating");
      console.log(err);
    }
  }

  function resolveCategory(el: HTMLDivElement) {
    let cat = (el.querySelector('select[name="category"]') as HTMLSelectElement).value;
    if (cat === 'new-cat') {
      cat = (el.querySelector('input[name="new-cat"]') as HTMLInputElement).value;
      setCategories(current => [...current, cat]);
    }
    return cat
  }

  async function handleRatingSave(event, i: number) {
    const el = event.currentTarget.parentElement.parentElement as HTMLDivElement;
    const cat = resolveCategory(el);

    const rating: Rating = {
      _id: el.children[0].id,
      name: (el.querySelector('input[name="name"]') as HTMLInputElement).value,
      rating: (el.querySelector('input[name="rating"]') as HTMLInputElement).value as any,
      link: (el.querySelector('input[name="link"]') as HTMLInputElement).value,
      location: (el.querySelector('input[name="location"]') as HTMLInputElement).value,
      category: cat,
      tags: (el.querySelector('input[name="tags"]') as HTMLInputElement).value?.split(','),
      imgUrl: (el.querySelector('input[name="imgurl"]') as HTMLInputElement).value,
      notes: (el.querySelector('input[name="notes"]') as HTMLInputElement).value,
      editDate: (new Date()).toString()
    }

    try {
      await Jordys_API.upsertRating(rating)
      setGreenMessage("updated rating successfully");
      // @ts-ignore
      document.getElementById("green-popover").showPopover();

      setRatings(current => {
        const next = [...current]
        next[i] = rating
        return next;
      })
    } catch (err) {
      setRedMessage("Error saving rating");
      console.log(err);
    }

  }

  function RatingAttribute({ attrName, attrValue }: { attrName: string, attrValue: any }) {
    return <div className="flex gap-2">
      <div>{attrName.toUpperCase()}</div>
      <input
        type="text"
        name={attrName}
        className="border-b border-dashed border-black"
        placeholder={attrName}
        defaultValue={attrValue}
      />
    </div>
  }

  function CategoryDropdown({ attrValue, options }: { attrValue: string, options: string[] }) {
    return <div className="flex gap-2">
      <div>CATEGORY</div>
      <select name="category" defaultValue={attrValue}>
        <option value="" disabled selected hidden>None</option>
        {options.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
        <option key="new-cat" value="new-cat">+ Add New</option>
      </select>
      <input
        type="text"
        name="new-cat"
        placeholder="Enter Category"
        className="border-b border-dashed border-black"
      />
    </div>
  }

  function compareEditDate(a: Rating, b: Rating) {

    if (a.editDate && b.editDate) {
      return (new Date(b.editDate)).getTime() - (new Date(a.editDate)).getTime()
    }
    if (a.editDate) {
      return -1;
    }
    if (b.editDate) {
      return 1;
    }
    return b.rating - a.rating;
  }


  function sortBy(crit: string) {
    if (crit === 'rate') {
      setRatings(current => current.slice().sort((a, b) => {
        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        }
        return a.name.localeCompare(b.name);
      }));
    } else if (crit === 'name') {
      setRatings(current => current.slice().sort((a, b) => {
        if (a.name !== b.name) {
          return a.name.localeCompare(b.name);
        }
        return b.rating - a.rating;
      }));
    } else {
      setRatings(current => current.slice().sort(compareEditDate));
    }
  }

  return <>
    <Layout>
      <Head>
        <title>Edit Ratings</title>
      </Head>
      <div
        className="fixed bottom-0 bg-red-200 rounded-md px-2"
        popover="auto"
        id="red-popover"
      >
        {redPopoverMessage}
      </div>
      <div
        className="fixed bottom-0 bg-green-200 rounded-md px-2"
        popover="auto"
        id="green-popover"
      >
        {greenPopoverMessage}
      </div>
      <section>
        <div className="max-w-3xl mx-auto flex flex-col">
          <div className="text-4xl py-3 mb-1 text-center">
            Edit Ratings
          </div>
          <div className="px-3">
            {
              deleted
              &&
              <div>
                <div>Following rating was deleted:</div>
                <div>{JSON.stringify(deleted, null, 2)}</div>
              </div>
            }
            <div className="px-3 flex flex-col border border-black mb-3" id="new-rating">
              <RatingAttribute attrName="name" attrValue="" />
              <RatingAttribute attrName="rating" attrValue="" />
              <RatingAttribute attrName="link" attrValue="" />
              <RatingAttribute attrName="location" attrValue="" />
              <CategoryDropdown attrValue="" options={categories} />
              <RatingAttribute attrName="tags" attrValue="" />
              <RatingAttribute attrName="imgurl" attrValue="" />
              <RatingAttribute attrName="notes" attrValue="" />
              <div
                className="secondary-button self-end"
                onClick={handleNewRating}
              >
                Save New
              </div>

            </div>
            <div className="w-full h-8 flex gap-2 justify-center items-center">
              <div>Sort By:</div>
              <div className="flex gap-1">
                <input type="radio" id="sortby" name="sortby" value="last" onClick={() => setSortByWhat('last')} defaultChecked />
                <label htmlFor="last">Last Edited</label>
              </div>
              <div className="flex gap-1">
                <input type="radio" id="sortby" name="sortby" value="rate" onClick={() => setSortByWhat('rate')} />
                <label htmlFor="rate">Best Rating</label>
              </div>
              <div className="flex gap-1">
                <input type="radio" id="sortby" name="sortby" value="name" onClick={() => setSortByWhat('name')} />
                <label htmlFor="name">Alphabetical</label>
              </div>
            </div>
            <div className="flex flex-col border border-black divide-y divide-y-black">
              {ratings?.map((rating, i) => (
                <div
                  className="flex flex-col px-2 hover:bg-amber-50 focus:bg-amber-50"
                  key={rating._id}
                >
                  <div
                    className="w-full h-8 flex items-center justify-between"
                    id={rating._id}
                    onClick={(evt) => {
                      if (openId !== evt.currentTarget.id) {
                        setOpenId(evt.currentTarget.id)
                      } else {
                        setOpenId(null);
                      }
                    }}
                  >
                    <div>{rating.name} — {rating.rating}</div>
                  </div>
                  {
                    openId === rating._id
                    && <>
                      <RatingAttribute attrName="name" attrValue={rating.name} />
                      <RatingAttribute attrName="rating" attrValue={rating.rating} />
                      <RatingAttribute attrName="link" attrValue={rating.link} />
                      <RatingAttribute attrName="location" attrValue={rating.location} />
                      <CategoryDropdown attrValue={rating.category} options={categories} />
                      <RatingAttribute attrName="tags" attrValue={rating.tags} />
                      <RatingAttribute attrName="imgurl" attrValue={rating.imgUrl} />
                      <RatingAttribute attrName="notes" attrValue={rating.notes} />
                      <div>Last Edit: {new Date(rating.editDate).toLocaleString()}</div>
                      <div className="flex gap-1 self-end pt-2">
                        <div
                          className="secondary-button self-end"
                          onClick={(event) => handleRatingSave(event, i)}
                        >
                          Save
                        </div>
                        <div
                          className="secondary-button self-end bg-red-400"
                          onClick={(event) => handleRatingDelete(event, i)}
                        >
                          Delete
                        </div>
                      </div>
                    </>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  </>
}
