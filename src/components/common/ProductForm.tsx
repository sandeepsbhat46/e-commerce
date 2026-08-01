import { useState } from "react";
import { toast } from "sonner";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useCategories } from "@/hooks/use-catalog";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function ProductForm() {
  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [status, setStatus] = useState("draft");
  const { data: categories = [] } = useCategories();
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <form
      className="grid gap-6 xl:grid-cols-3"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Product published (mock)");
      }}
    >
      <div className="space-y-6 xl:col-span-2">
        <Section title="Basic info">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              className="sm:col-span-2"
              label="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aurora Wireless Headphones"
            />
            <TextField
              label="Slug"
              value={slug}
              slotProps={{ input: { readOnly: true } }}
              className="text-muted-foreground"
            />
            <TextField label="Brand" placeholder="Aurora" />
            <FormControl className="sm:col-span-2">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                displayEmpty
              >
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.slug}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Section>

        <Section title="Description">
          <div className="rounded-lg border border-border">
            <div className="flex gap-1 border-b border-border p-2 text-xs text-muted-foreground">
              <span className="rounded px-2 py-1 font-bold hover:bg-muted">B</span>
              <span className="rounded px-2 py-1 italic hover:bg-muted">I</span>
              <span className="rounded px-2 py-1 underline hover:bg-muted">U</span>
              <span className="rounded px-2 py-1 hover:bg-muted">List</span>
            </div>
            <TextField
              multiline
              rows={6}
              fullWidth
              variant="standard"
              slotProps={{ input: { disableUnderline: true } }}
              className="px-3 py-2"
              placeholder="Tell buyers what makes this product good."
            />
          </div>
        </Section>

        <Section title="Media">
          <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
            Drag and drop up to 8 images, or click to browse
          </div>
        </Section>

        <Section title="Pricing">
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField label="Price" placeholder="189.00" />
            <TextField label="Compare at" placeholder="249.00" />
            <TextField label="Cost price" placeholder="98.00" />
          </div>
        </Section>

        <Section title="Inventory">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="SKU" placeholder="SKU-1000" />
            <TextField label="Barcode" placeholder="0123456789" />
            <TextField label="Quantity" placeholder="42" />
            <TextField label="Low stock alert" placeholder="5" />
            <label className="flex items-center gap-3 text-sm sm:col-span-2">
              <Switch defaultChecked /> Track quantity
            </label>
          </div>
        </Section>

        <Section title="Variants">
          <p className="text-sm text-muted-foreground">
            Add a variant type (size, color) to generate combinations with their own price and
            stock.
          </p>
          <Button
            type="button"
            variant="outlined"
            size="small"
            className="mt-3"
            onClick={() => toast("Variant editor (mock)")}
          >
            Add variant type
          </Button>
        </Section>

        <Section title="Shipping & SEO">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Weight (kg)" placeholder="0.8" />
            <TextField label="Dimensions (cm)" placeholder="20 × 18 × 8" />
            <TextField
              className="sm:col-span-2"
              label="Meta title"
              placeholder={name || "Product title"}
            />
            <TextField className="sm:col-span-2" label="Meta description" multiline rows={3} />
          </div>
        </Section>
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 xl:sticky xl:top-6">
        <h2 className="text-base font-semibold">Status</h2>
        <FormControl fullWidth>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>
        <Divider />
        <Button type="submit" variant="contained" className="w-full">
          Publish
        </Button>
        <Button
          type="button"
          variant="outlined"
          className="w-full"
          onClick={() => toast("Draft saved")}
        >
          Save draft
        </Button>
      </aside>
    </form>
  );
}
