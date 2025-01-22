const demoBookings = [
    // Spot 1, OwnerId 1
    {
      spotId: 1,
      userId: 2,
      startDate: new Date('September 13, 2025 15:00:00'),
      endDate: new Date('September 16, 2025 11:00:00')
    },
    {
      spotId: 1,
      userId: 2,
      startDate: new Date('October 3, 2025 15:00:00'),
      endDate: new Date('October 6, 2025 11:00:00')
    },
    {
      spotId: 1,
      userId: 3,
      startDate: new Date('October 8, 2025 15:00:00'),
      endDate: new Date('October 14, 2025 11:00:00')
    },
    {
      spotId: 1,
      userId: 4,
      startDate: new Date('October 17, 2025 15:00:00'),
      endDate: new Date('October 20, 2025 11:00:00')
    },
    // Spot 2, OwnerId 1
    {
      spotId: 2,
      userId: 3,
      startDate: new Date('August 05, 2025 9:00:00'),
      endDate: new Date('August 16, 2025 12:00:00')
    },
    {
      spotId: 2,
      userId: 4,
      startDate: new Date('August 22, 2025 9:00:00'),
      endDate: new Date('August 31, 2025 12:00:00')
    },
    {
      spotId: 2,
      userId: 10,
      startDate: new Date('September 05, 2025 9:00:00'),
      endDate: new Date('September 14, 2025 12:00:00')
    },
    {
      spotId: 2,
      userId: 8,
      startDate: new Date('September 16, 2025 9:00:00'),
      endDate: new Date('September 17, 2025 12:00:00')
    },
    // Spot 3, OwnerId 2
    {
      spotId: 3,
      userId: 1,
      startDate: new Date('August 15, 2025 14:00:00'),
      endDate: new Date('August 17, 2025 12:00:00')
    },
    {
      spotId: 3,
      userId: 5,
      startDate: new Date('August 29, 2025 14:00:00'),
      endDate: new Date('August 31, 2025 12:00:00')
    },
    {
      spotId: 3,
      userId: 7,
      startDate: new Date('September 12, 2025 14:00:00'),
      endDate: new Date('September 21, 2025 12:00:00')
    },
    {
      spotId: 3,
      userId: 9,
      startDate: new Date('October 24, 2025 14:00:00'),
      endDate: new Date('November 02, 2025 12:00:00')
    },
    // Spot 4, OwnerId 2
    {
      spotId: 4,
      userId: 5,
      startDate: new Date('July 25, 2025 15:00:00'),
      endDate: new Date('August 02, 2025 13:00:00')
    },
    {
      spotId: 4,
      userId: 1,
      startDate: new Date('August 22, 2025 15:00:00'),
      endDate: new Date('August 31, 2025 13:00:00')
    },
    {
      spotId: 4,
      userId: 6,
      startDate: new Date('September 05, 2025 15:00:00'),
      endDate: new Date('September 07, 2025 13:00:00')
    },
    {
      spotId: 4,
      userId: 7,
      startDate: new Date('October 03, 2025 15:00:00'),
      endDate: new Date('October 05, 2026 13:00:00')
    },
    // Spot 5, OwnerId 3
    {
      spotId: 5,
      userId: 2,
      startDate: new Date('July 25, 2025 15:00:00'),
      endDate: new Date('August 02, 2025 13:00:00')
    },
    {
      spotId: 5,
      userId: 2,
      startDate: new Date('August 22, 2025 15:00:00'),
      endDate: new Date('August 31, 2025 13:00:00')
    },
    {
      spotId: 5,
      userId: 4,
      startDate: new Date('September 05, 2025 15:00:00'),
      endDate: new Date('September 07, 2025 13:00:00')
    },
    {
      spotId: 5,
      userId: 5,
      startDate: new Date('October 03, 2025 15:00:00'),
      endDate: new Date('October 05, 2026 13:00:00')
    },
    // Spot 6, OwnerId 3
    {
      spotId: 6,
      userId: 6,
      startDate: new Date('August 08, 2025 15:00:00'),
      endDate: new Date('August 10, 2025 13:00:00')
    },
    {
      spotId: 6,
      userId: 7,
      startDate: new Date('August 22, 2025 15:00:00'),
      endDate: new Date('August 31, 2025 13:00:00')
    },
    {
      spotId: 6,
      userId: 8,
      startDate: new Date('September 03, 2025 15:00:00'),
      endDate: new Date('September 05, 2025 13:00:00')
    },
    {
      spotId: 6,
      userId: 9,
      startDate: new Date('October 03, 2025 15:00:00'),
      endDate: new Date('October 05, 2026 13:00:00')
    },
    // Spot 7, OwnerId 4
    {
      spotId: 7,
      userId: 1,
      startDate: new Date('August 18, 2025 15:00:00'),
      endDate: new Date('August 20, 2025 13:00:00')
    },
    {
      spotId: 7,
      userId: 10,
      startDate: new Date('August 22, 2025 15:00:00'),
      endDate: new Date('August 31, 2025 13:00:00')
    },
    {
      spotId: 7,
      userId: 2,
      startDate: new Date('September 03, 2025 15:00:00'),
      endDate: new Date('September 05, 2025 13:00:00')
    },
    {
      spotId: 7,
      userId: 3,
      startDate: new Date('October 03, 2025 15:00:00'),
      endDate: new Date('October 05, 2026 13:00:00')
    },
    // Spot 8, OwnerId 4
    {
      spotId: 8,
      userId: 2,
      startDate: new Date('August 08, 2025 15:00:00'),
      endDate: new Date('August 18, 2025 13:00:00')
    },
    {
      spotId: 8,
      userId: 1,
      startDate: new Date('September 04, 2025 15:00:00'),
      endDate: new Date('September 08, 2025 13:00:00')
    },
    {
      spotId: 8,
      userId: 5,
      startDate: new Date('October 21, 2025 15:00:00'),
      endDate: new Date('November 03, 2025 13:00:00')
    },
    {
      spotId: 8,
      userId: 3,
      startDate: new Date('November 21, 2025 15:00:00'),
      endDate: new Date('November 30, 2025 13:00:00')
    },
    // Spot 9, OwnerId 5
    {
      spotId: 9,
      userId: 2,
      startDate: new Date('September 06, 2025 15:00:00'),
      endDate: new Date('September 08, 2025 13:00:00')
    },
    {
      spotId: 9,
      userId: 1,
      startDate: new Date('September 09, 2025 15:00:00'),
      endDate: new Date('September 12, 2025 13:00:00')
    },
    {
      spotId: 9,
      userId: 5,
      startDate: new Date('November 18, 2025 15:00:00'),
      endDate: new Date('November 30, 2026 13:00:00')
    },
    {
      spotId: 9,
      userId: 3,
      startDate: new Date('December 22, 2025 15:00:00'),
      endDate: new Date('January 09, 2026 13:00:00')
    },
    // Spot 10, OwnerId 5
    {
      spotId: 10,
      userId: 4,
      startDate: new Date('August 04, 2025 15:00:00'),
      endDate: new Date('August 11, 2025 13:00:00')
    },
    {
      spotId: 10,
      userId: 1,
      startDate: new Date('September 13, 2025 15:00:00'),
      endDate: new Date('September 22, 2025 13:00:00')
    },
    {
      spotId: 10,
      userId: 2,
      startDate: new Date('September 25, 2025 15:00:00'),
      endDate: new Date('September 30, 2025 13:00:00')
    },
    {
      spotId: 10,
      userId: 5,
      startDate: new Date('December 22, 2025 15:00:00'),
      endDate: new Date('December 30, 2025 13:00:00')
    },
    // Spot 11, OwnerId 6
    {
      spotId: 11,
      userId: 1,
      startDate: new Date('September 26, 2025 15:00:00'),
      endDate: new Date('September 29, 2025 13:00:00')
    },
    {
      spotId: 11,
      userId: 2,
      startDate: new Date('October 01, 2025 15:00:00'),
      endDate: new Date('October 10, 2025 13:00:00')
    },
    {
      spotId: 11,
      userId: 4,
      startDate: new Date('October 20, 2025 15:00:00'),
      endDate: new Date('October 22, 2025 13:00:00')
    },
    {
      spotId: 11,
      userId: 7,
      startDate: new Date('October 24, 2025 15:00:00'),
      endDate: new Date('November 02, 2025 13:00:00')
    },
    // Spot 12, OwnerId 6
    {
      spotId: 12,
      userId: 4,
      startDate: new Date('September 12, 2025 15:00:00'),
      endDate: new Date('September 21, 2025 13:00:00')
    },
    {
      spotId: 12,
      userId: 1,
      startDate: new Date('October 01, 2025 15:00:00'),
      endDate: new Date('October 06, 2025 13:00:00')
    },
    {
      spotId: 12,
      userId: 2,
      startDate: new Date('October 24, 2025 15:00:00'),
      endDate: new Date('November 02, 2025 13:00:00')
    },
    {
      spotId: 12,
      userId: 7,
      startDate: new Date('November 20, 2025 15:00:00'),
      endDate: new Date('November 31, 2025 13:00:00')
    },
    // Spot 13, OwnerId 7
    {
      spotId: 13,
      userId: 6,
      startDate: new Date('August 14, 2025 15:00:00'),
      endDate: new Date('August 18, 2025 13:00:00')
    },
    {
      spotId: 13,
      userId: 1,
      startDate: new Date('October 07, 2025 15:00:00'),
      endDate: new Date('October 14, 2025 13:00:00')
    },
    {
      spotId: 13,
      userId: 4,
      startDate: new Date('October 24, 2025 15:00:00'),
      endDate: new Date('November 03, 2025 13:00:00')
    },
    {
      spotId: 13,
      userId: 2,
      startDate: new Date('November 07, 2025 15:00:00'),
      endDate: new Date('November 10, 2025 13:00:00')
    },
    // Spot 14, OwnerId 7
    {
      spotId: 14,
      userId: 6,
      startDate: new Date('September 11, 2025 15:00:00'),
      endDate: new Date('September 18, 2025 13:00:00')
    },
    {
      spotId: 14,
      userId: 1,
      startDate: new Date('October 15, 2025 15:00:00'),
      endDate: new Date('October 20, 2025 13:00:00')
    },
    {
      spotId: 14,
      userId: 2,
      startDate: new Date('November 17, 2025 15:00:00'),
      endDate: new Date('November 23, 2025 13:00:00')
    },
    {
      spotId: 14,
      userId: 4,
      startDate: new Date('November 24, 2025 15:00:00'),
      endDate: new Date('November 30, 2025 13:00:00')
    },
    // Spot 15, OwnerId 8
    {
      spotId: 15,
      userId: 6,
      startDate: new Date('September 22, 2025 15:00:00'),
      endDate: new Date('September 30, 2025 13:00:00')
    },
    {
      spotId: 15,
      userId: 1,
      startDate: new Date('October 21, 2025 15:00:00'),
      endDate: new Date('October 27, 2025 13:00:00')
    },
    {
      spotId: 15,
      userId: 2,
      startDate: new Date('November 24, 2025 15:00:00'),
      endDate: new Date('November 30, 2025 13:00:00')
    },
    {
      spotId: 15,
      userId: 4,
      startDate: new Date('December 22, 2025 15:00:00'),
      endDate: new Date('January 05, 2026 13:00:00')
    },
    // Spot 16, OwnerId 8
    {
      spotId: 16,
      userId: 5,
      startDate: new Date('August 07, 2025 15:00:00'),
      endDate: new Date('August 12, 2026 13:00:00')
    },
    {
      spotId: 16,
      userId: 6,
      startDate: new Date('October 02, 2025 15:00:00'),
      endDate: new Date('October 13, 2026 13:00:00')
    },
    {
      spotId: 16,
      userId: 1,
      startDate: new Date('October 28, 2025 15:00:00'),
      endDate: new Date('November 03, 2025 13:00:00')
    },
    {
      spotId: 16,
      userId: 2,
      startDate: new Date('December 19, 2025 15:00:00'),
      endDate: new Date('January 06, 2026 13:00:00')
    },
    // Spot 17, OwnerId 9
    {
      spotId: 17,
      userId: 5,
      startDate: new Date('July 30, 2025 15:00:00'),
      endDate: new Date('August 03, 2025 13:00:00')
    },
    {
      spotId: 17,
      userId: 8,
      startDate: new Date('October 24, 2025 15:00:00'),
      endDate: new Date('November 03, 2025 13:00:00')
    },
    {
      spotId: 17,
      userId: 1,
      startDate: new Date('November 04, 2025 15:00:00'),
      endDate: new Date('November 07, 2025 13:00:00')
    },
    {
      spotId: 17,
      userId: 8,
      startDate: new Date('December 20, 2025 15:00:00'),
      endDate: new Date('January 05, 2025 13:00:00')
    },
    // Spot 18, OwnerId 9
    {
      spotId: 18,
      userId: 3,
      startDate: new Date('July 30, 2025 15:00:00'),
      endDate: new Date('August 03, 2025 13:00:00')
    },
    {
      spotId: 18,
      userId: 5,
      startDate: new Date('August 15, 2025 15:00:00'),
      endDate: new Date('August 21, 2025 13:00:00')
    },
    {
      spotId: 18,
      userId: 3,
      startDate: new Date('August 22, 2025 15:00:00'),
      endDate: new Date('August 27, 2025 13:00:00')
    },
    {
      spotId: 18,
      userId: 1,
      startDate: new Date('November 08, 2025 15:00:00'),
      endDate: new Date('November 10, 2025 13:00:00')
    },
    // Spot 19, OwnerId 10
    {
      spotId: 19,
      userId: 5,
      startDate: new Date('September 03, 2025 15:00:00'),
      endDate: new Date('September 09, 2025 13:00:00')
    },
    {
      spotId: 19,
      userId: 3,
      startDate: new Date('October 17, 2025 15:00:00'),
      endDate: new Date('October 22, 2025 13:00:00')
    },
    {
      spotId: 19,
      userId: 1,
      startDate: new Date('November 11, 2025 15:00:00'),
      endDate: new Date('November 17, 2025 13:00:00')
    },
    {
      spotId: 19,
      userId: 9,
      startDate: new Date('December 23, 2025 15:00:00'),
      endDate: new Date('December 31, 2025 13:00:00')
    },
    // Spot 20, OwnerId 10
    {
      spotId: 20,
      userId: 3,
      startDate: new Date('October 24, 2025 15:00:00'),
      endDate: new Date('November 02, 2025 13:00:00')
    },
    {
      spotId: 20,
      userId: 1,
      startDate: new Date('November 18, 2025 15:00:00'),
      endDate: new Date('November 30, 2025 13:00:00')
    },
    {
      spotId: 20,
      userId: 5,
      startDate: new Date('September 11, 2025 15:00:00'),
      endDate: new Date('September 15, 2025 13:00:00')
    },
    {
      spotId: 20,
      userId: 7,
      startDate: new Date('December 23, 2025 15:00:00'),
      endDate: new Date('December 05, 2025 13:00:00')
    },

]

module.exports = demoBookings;
