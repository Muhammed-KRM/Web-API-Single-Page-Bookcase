﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Models;

namespace WebApi.Repositories.Config
{
    public class BookConfig : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.Property(b => b.Price)
           .HasColumnType("decimal(18,2)");

            builder.HasData(
                    new Book { Id = 1, Title = "Karagöz ve Hacivat", Price = 75 },
                    new Book { Id = 2, Title = "Mesnevi", Price = 175 },
                    new Book { Id = 3, Title = "Devlet", Price = 375 }
                );
        }
    }
}
