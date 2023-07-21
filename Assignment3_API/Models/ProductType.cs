namespace Assignment3_Backend.Models
{
    public class ProductType : BaseEntity
    {
        public int ProductTypeId { get; set; }

        public virtual ICollection<Product> Products { get; set; }

    }
}
