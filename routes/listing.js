const express = require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");

const validateListing =(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);  //VALIDATION FOR SCHEMA LINE
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//Index Route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

//New Route
router.get("/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

//Create Route
router.post("/",validateListing,wrapAsync(async (req,res)=>{
    // let {title,description,image,price,country,location}=req.body;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");    
}));

//Show Route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs",{listing});
}));

//Edit Route
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));

//Update Route
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing");
    }
    let {id}=req.params;
    let listing=await Listing.findById(id);
    const imageUrl = req.body.listing.image?.url || listing.image.url;

    // Update the listing, preserving the original image URL if the input is empty
    await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
        image: { ...req.body.listing.image, url: imageUrl }
    });
    res.redirect(`/listings/${id}`);
}));


//Delete Route
router.delete("/:id", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports=router;