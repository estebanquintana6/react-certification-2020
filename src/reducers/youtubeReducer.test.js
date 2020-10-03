import YoutubeReducer from './youtubeReducer';

describe('youtube reducer', () => {
  it('should return the initial state', () => {
    expect(YoutubeReducer({}, 'default')).toEqual({});
  });

  it('should add a searched video', () => {
    expect(
      YoutubeReducer(
        {},
        {
          type: 'SEARCH_VIDEOS',
          payload: {
            id: 'test',
          },
        }
      )
    ).toEqual({
      videos: {
        id: 'test',
      },
    });
  });

  it('should add a favorite video', () => {
    expect(
      YoutubeReducer(
        {
          favorites: [],
        },
        {
          type: 'ADD_TO_FAVORITES',
          payload: {
            id: 'test',
          },
        }
      )
    ).toEqual({
      favorites: [
        {
          id: 'test',
        },
      ],
    });
  });

  it('should remove a favorite video', () => {
    expect(
      YoutubeReducer(
        {
          favorites: [
            {
              id: 'test',
            },
          ],
        },
        {
          type: 'REMOVE_FROM_FAVORITES',
          payload: {
            id: 'test',
          },
        }
      )
    ).toEqual({
      favorites: [],
    });
  });

  it('clear favorites', () => {
    expect(
      YoutubeReducer(
        {
          favorites: [
            {
              id: 'test',
            },
          ],
        },
        {
          type: 'CLEAR_FAVORITES',
        }
      )
    ).toEqual({
      favorites: [],
    });
  });
});
