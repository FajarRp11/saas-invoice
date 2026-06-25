"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { createOrganization } from "@/app/actions/organization";
import { Building2Icon, Settings2Icon } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createOrganization,
    null,
  );

  const fieldErrors =
    typeof state?.error === "object" ? state.error.fieldErrors : null;

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Organization created successfully!");
        // Refresh router / session and push to dashboard
        router.refresh();
        router.push("/dashboard");
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const SUPPORTED_CURRENCIES = [
    { value: "IDR", label: "IDR - Indonesian Rupiah" },
    { value: "USD", label: "USD - US Dollar" },
    { value: "SGD", label: "SGD - Singapore Dollar" },
    { value: "MYR", label: "MYR - Malaysian Ringgit" },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl z-10 transition-all duration-300 hover:scale-[1.002]">
        <Card className="backdrop-blur-sm bg-card/90 border border-border/80 shadow-2xl shadow-indigo-950/5 dark:shadow-black/40">
          <CardHeader className="border-b border-border/50 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20">
                <Building2Icon className="size-6 " />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Set Up Your Organization
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Fill in the details below to configure your workspace and
                  default settings.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={formAction}>
              <FieldGroup className="gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Organization details */}
                  <FieldSet className="gap-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 border-b border-border/50 pb-2 mb-1">
                      <Building2Icon className="size-4" />
                      <span>Company Profile</span>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="name">Organization Name</FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. Acme Corporation"
                        required
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldError>{fieldErrors?.name}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">
                        Organization Email
                      </FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. billing@acme.com"
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldDescription>
                        For sending invoices. Optional.
                      </FieldDescription>
                      <FieldError>{fieldErrors?.email}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. +1 (555) 000-0000"
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldError>{fieldErrors?.phone}</FieldError>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="city">City</FieldLabel>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="e.g. Jakarta"
                          className="bg-background/50 hover:bg-background/80 transition-colors"
                        />
                        <FieldError>{fieldErrors?.city}</FieldError>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="country">Country</FieldLabel>
                        <Input
                          id="country"
                          name="country"
                          type="text"
                          placeholder="e.g. Indonesia"
                          className="bg-background/50 hover:bg-background/80 transition-colors"
                        />
                        <FieldError>{fieldErrors?.country}</FieldError>
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="address">Address</FieldLabel>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="e.g. Sudirman St. No. 45"
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldError>{fieldErrors?.address}</FieldError>
                    </Field>
                  </FieldSet>

                  {/* Right Column: Invoice and Preferences */}
                  <FieldSet className="gap-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 border-b border-border/50 pb-2 mb-1">
                      <Settings2Icon className="size-4" />
                      <span>Invoice settings</span>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="currency">
                        Default Currency
                      </FieldLabel>
                      <Select name="currency" defaultValue="IDR">
                        <SelectTrigger
                          id="currency"
                          className="bg-background/50 hover:bg-background/80 transition-colors"
                        >
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {SUPPORTED_CURRENCIES.map((currency) => (
                              <SelectItem
                                key={currency.value}
                                value={currency.value}
                              >
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FieldError>{fieldErrors?.currency}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="taxPercent">
                        Default Tax (%)
                      </FieldLabel>
                      <Input
                        id="taxPercent"
                        name="taxPercent"
                        type="number"
                        step="any"
                        defaultValue="11"
                        placeholder="11"
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldDescription>
                        Default tax percentage applied to items.
                      </FieldDescription>
                      <FieldError>{fieldErrors?.taxPercent}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="invoicePrefix">
                        Invoice Prefix
                      </FieldLabel>
                      <Input
                        id="invoicePrefix"
                        name="invoicePrefix"
                        type="text"
                        defaultValue="INV"
                        placeholder="INV"
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldError>{fieldErrors?.invoicePrefix}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="nextInvoiceNum">
                        Next Invoice Number
                      </FieldLabel>
                      <Input
                        id="nextInvoiceNum"
                        name="nextInvoiceNum"
                        type="number"
                        defaultValue="1"
                        placeholder="1"
                        className="bg-background/50 hover:bg-background/80 transition-colors"
                      />
                      <FieldDescription>
                        Start number for auto-increment invoice codes.
                      </FieldDescription>
                      <FieldError>{fieldErrors?.nextInvoiceNum}</FieldError>
                    </Field>
                  </FieldSet>
                </div>

                <div className="flex justify-end gap-3 border-t border-border/50 pt-6 mt-2">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Spinner className="text-white" />
                        Saving...
                      </span>
                    ) : (
                      "Set Up Workspace"
                    )}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
