'use server';

// import { db } from '@/lib/db';

export async function addProperty(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  console.log(data);
}
