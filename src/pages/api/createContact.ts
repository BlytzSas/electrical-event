export const prerender = false;
import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({
    //TODO: move this to env variables 
    accessToken: import.meta.env.VITE_HUBSPOT_API_KEY || process.env.HUBSPOT_API_KEY,
  });

  export async function POST({ request }: { request: Request }) {
    try {
      const { name, email, phone, message } = await request.json();

      const properties = {
        email,
        firstname: name,
        phone,
        message, 
      };
  
      const SimplePublicObjectInput = { properties };
      const response = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
      console.log('HubSpot response:', response);
  
      return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
    } catch (error: any) {
      console.error('HubSpot error:', error?.message || error);
        console.error('HubSpot error response:', error?.response?.body);
  
      return new Response(
        JSON.stringify({
          success: false,
          error: error?.response?.body || error.message || 'Unknown error',
        }),
        { status: 500 }
      );
    }
  }