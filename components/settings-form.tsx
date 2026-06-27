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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateOrganization } from "@/app/actions/organization";
import { updatePassword } from "@/app/actions/user";

type UserProp = {
  id: string;
  name: string | null;
  email: string;
  password?: string | null;
};

type OrganizationProp = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  currency: string;
  taxPercent: number;
  invoicePrefix: string;
  nextInvoiceNum: number;
};

interface SettingsFormProps {
  user: UserProp;
  organization: OrganizationProp | null;
}

export default function SettingsForm({
  user,
  organization,
}: SettingsFormProps) {
  const router = useRouter();

  // 1. Company Settings Form State
  const [orgState, orgAction, orgPending] = useActionState(
    updateOrganization,
    null,
  );
  const orgErrors =
    typeof orgState?.error === "object" ? orgState.error.fieldErrors : null;

  useEffect(() => {
    if (orgState) {
      if (orgState.success) {
        toast.success(orgState.message || "Company settings updated!");
        router.refresh();
      } else if (orgState.message) {
        toast.error(orgState.message);
      }
    }
  }, [orgState, router]);

  // 2. User Settings / Change Password Form State
  const [pwdState, pwdAction, pwdPending] = useActionState(
    updatePassword,
    null,
  );
  const pwdErrors =
    typeof pwdState?.error === "object" ? pwdState.error.fieldErrors : null;

  useEffect(() => {
    if (pwdState) {
      if (pwdState.success) {
        toast.success(pwdState.message || "Password updated successfully!");
        const formEl = document.getElementById(
          "change-password-form",
        ) as HTMLFormElement | null;
        if (formEl) {
          formEl.reset();
        }
        router.refresh();
      } else if (pwdState.message) {
        toast.error(pwdState.message);
      }
    }
  }, [pwdState, router]);

  const hasPassword = !!user.password;

  return (
    <Tabs defaultValue="company" className="w-full max-w-4xl mx-auto">
      <TabsList className="mb-6">
        <TabsTrigger value="company">Setting Perusahaan</TabsTrigger>
        <TabsTrigger value="user">User Settings</TabsTrigger>
      </TabsList>

      {/* Tab 1: Company Settings */}
      <TabsContent value="company">
        <Card>
          <CardHeader>
            <CardTitle>Setting Perusahaan</CardTitle>
            <CardDescription>
              Ubah informasi perusahaan dan pengaturan default invoice Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {organization ? (
              <form action={orgAction}>
                <FieldGroup className="mb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field>
                      <Label htmlFor="org-name">Nama Perusahaan</Label>
                      <Input
                        id="org-name"
                        name="name"
                        defaultValue={organization.name}
                        placeholder="PT. Maju Bersama"
                        required
                      />
                      <FieldError>{orgErrors?.name}</FieldError>
                    </Field>

                    <Field>
                      <Label htmlFor="org-email">Email Perusahaan</Label>
                      <Input
                        id="org-email"
                        name="email"
                        type="email"
                        defaultValue={organization.email ?? ""}
                        placeholder="company@mail.com"
                      />
                      <FieldError>{orgErrors?.email}</FieldError>
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field>
                      <Label htmlFor="org-phone">No. Telepon</Label>
                      <Input
                        id="org-phone"
                        name="phone"
                        defaultValue={organization.phone ?? ""}
                        placeholder="021-123456"
                      />
                      <FieldError>{orgErrors?.phone}</FieldError>
                    </Field>

                    <Field>
                      <Label htmlFor="org-currency">Mata Uang (Currency)</Label>
                      <Input
                        id="org-currency"
                        name="currency"
                        defaultValue={organization.currency}
                        placeholder="IDR"
                        required
                      />
                      <FieldError>{orgErrors?.currency}</FieldError>
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Field>
                      <Label htmlFor="org-taxPercent">PPN Default (%)</Label>
                      <Input
                        id="org-taxPercent"
                        name="taxPercent"
                        type="number"
                        step="0.01"
                        defaultValue={organization.taxPercent}
                        required
                      />
                      <FieldError>{orgErrors?.taxPercent}</FieldError>
                    </Field>

                    <Field>
                      <Label htmlFor="org-invoicePrefix">Prefix Invoice</Label>
                      <Input
                        id="org-invoicePrefix"
                        name="invoicePrefix"
                        defaultValue={organization.invoicePrefix}
                        placeholder="INV"
                        required
                      />
                      <FieldError>{orgErrors?.invoicePrefix}</FieldError>
                    </Field>

                    <Field>
                      <Label htmlFor="org-nextInvoiceNum">
                        No Invoice Berikutnya
                      </Label>
                      <Input
                        id="org-nextInvoiceNum"
                        name="nextInvoiceNum"
                        type="number"
                        defaultValue={organization.nextInvoiceNum}
                        required
                      />
                      <FieldError>{orgErrors?.nextInvoiceNum}</FieldError>
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field>
                      <Label htmlFor="org-city">Kota</Label>
                      <Input
                        id="org-city"
                        name="city"
                        defaultValue={organization.city ?? ""}
                        placeholder="Jakarta"
                      />
                      <FieldError>{orgErrors?.city}</FieldError>
                    </Field>

                    <Field>
                      <Label htmlFor="org-country">Negara</Label>
                      <Input
                        id="org-country"
                        name="country"
                        defaultValue={organization.country ?? ""}
                        placeholder="Indonesia"
                      />
                      <FieldError>{orgErrors?.country}</FieldError>
                    </Field>
                  </div>

                  <Field>
                    <Label htmlFor="org-address">Alamat</Label>
                    <Textarea
                      id="org-address"
                      name="address"
                      defaultValue={organization.address ?? ""}
                      placeholder="Jl. Sudirman No. 123"
                    />
                    <FieldError>{orgErrors?.address}</FieldError>
                  </Field>
                </FieldGroup>
                <div className="flex justify-end">
                  <Button type="submit" disabled={orgPending}>
                    {orgPending ? <Spinner /> : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Belum ada data perusahaan. Silakan onboard terlebih dahulu.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab 2: User Settings (Change Password) */}
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>User Settings</CardTitle>
            <CardDescription>
              Ubah password akun Anda untuk menjaga keamanan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="change-password-form" action={pwdAction}>
              <FieldGroup className="mb-6">
                {hasPassword ? (
                  <Field>
                    <Label htmlFor="current-password">Password Saat Ini</Label>
                    <Input
                      id="current-password"
                      name="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                    <FieldError>{pwdErrors?.currentPassword}</FieldError>
                  </Field>
                ) : (
                  <div className="p-3 bg-muted text-muted-foreground text-xs rounded-md">
                    Anda masuk menggunakan Google OAuth. Anda tidak memiliki
                    password saat ini, namun Anda dapat mengatur password baru
                    di bawah.
                  </div>
                )}

                <Field>
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input
                    id="new-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                  <FieldError>{pwdErrors?.password}</FieldError>
                </Field>

                <Field>
                  <Label htmlFor="confirm-password">
                    Konfirmasi Password Baru
                  </Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                  <FieldError>{pwdErrors?.confirmPassword}</FieldError>
                </Field>
              </FieldGroup>
              <div className="flex justify-end">
                <Button type="submit" disabled={pwdPending}>
                  {pwdPending ? <Spinner /> : "Ganti Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
