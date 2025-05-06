import { rest } from 'msw'

       export const handlers = [
           rest.post('/auth/api/user/login/', (req, res, ctx) => {
               return res(
                   ctx.json({
                       access_token: 'mock_access_token',
                       refresh_token: 'mock_refresh_token',
                       referral_code_used: 'mock_referral',
                   })
               )
           }),
           rest.get('/api/events', (req, res, ctx) => {
               return res(
                   ctx.json([
                       {
                           id: 1,
                           name: 'Test Event',
                           image: 'https://example.com/image.jpg',
                           event_category: [{ price: '10' }],
                           city_id: 1,
                           area: 1,
                           event_time: [{ date: '2025-05-10', start_time: '18:00' }],
                       },
                   ])
               )
           }),
           rest.get('/api/cities/', (req, res, ctx) => {
               return res(
                   ctx.json([
                       { id: 1, name: 'Test City' },
                   ])
               )
           }),
           rest.get('/api/area/', (req, res, ctx) => {
               return res(
                   ctx.json([
                       { id: 1, name: 'Test Area' },
                   ])
               )
           }),
       ]