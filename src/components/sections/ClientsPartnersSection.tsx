import { getEntries, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';
import ClientsPartnersSectionClient from './ClientsPartnersSectionClient';

interface ClientItem {
  _id: string;
  name: string;
  logoUrl?: string;
}

const defaultClients: ClientItem[] = [
  { _id: '1', name: 'PT PLN Indonesia' },
  { _id: '2', name: 'PT Pertamina' },
  { _id: '3', name: 'PT Indofood' },
  { _id: '4', name: 'PT Unilever' },
  { _id: '5', name: 'PT Astra International' },
  { _id: '6', name: 'PT Semen Indonesia' },
  { _id: '7', name: 'PT Pupuk Kaltim' },
  { _id: '8', name: 'PT Krakatau Steel' },
];

export default async function ClientsPartnersSection() {
  const clients = await (async () => {
    try {
      const entries = await getEntries(CONTENT_TYPES.CLIENT);
      if (entries.length > 0) {
        return entries.map((item: any) => ({
          _id: item.sys.id,
          name: item.fields.name as string,
          logoUrl: getAssetUrl(item.fields.logo),
        }));
      }
    } catch {}
    return defaultClients;
  })();

  return <ClientsPartnersSectionClient clients={clients} />;
}
