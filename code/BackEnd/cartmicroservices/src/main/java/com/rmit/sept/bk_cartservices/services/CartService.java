package com.rmit.sept.bk_cartservices.services;


import com.rmit.sept.bk_cartservices.Repositories.*;
import com.rmit.sept.bk_cartservices.exceptions.ListingNotFoundException;
import com.rmit.sept.bk_cartservices.model.*;
import com.rmit.sept.bk_cartservices.payload.UserCartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private BookRepository bookRepository;


    public CartItem saveCartItem(CartItem cartItem) {
        if (listingRepository.getById(cartItem.getListingId()) == null) {
            throw new ListingNotFoundException("Listing with id " + cartItem.getListingId() + " not found");
        }
        return cartItemRepository.save(cartItem);
    }

    public void removeCartItem(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }

    public UserCartResponse getCart(Long userId) {
        UserCartResponse userCart = new UserCartResponse(userId);
        List<CartItemDetails> userCartItemsList = userCart.getItemsList();

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        for (CartItem cartItem : cartItems) {
            CartItemDetails cartItemDetails = new CartItemDetails();

            Listing listing = listingRepository.getById(cartItem.getListingId());
            if (listing == null) {
                cartItemDetails.setStatus(CartItemDetails.STATUS_LISTING_NOT_FOUND);
            } else {
                cartItemDetails.setListingId(cartItem.getListingId());

                Book book = bookRepository.getById(listing.getBookId());
                if (book == null) {
                    cartItemDetails.setStatus(CartItemDetails.STATUS_BOOK_NOT_FOUND);
                } else {
                    cartItemDetails.setBookId(listing.getBookId());
                    cartItemDetails.setTitle(book.getTitle());
                    cartItemDetails.setPrice(listing.getPrice());
                    cartItemDetails.setSeller(listing.getSeller());
                    cartItemDetails.setImgURL(book.getImgURL());
                    cartItemDetails.setSold(listing.getSold());

                    if (listing.getSold()) {
                        cartItemDetails.setStatus(CartItemDetails.STATUS_LISTING_SOLD);
                    }
                }
            }
            userCartItemsList.add(cartItemDetails);
        }
        userCart.setNumItems(userCartItemsList.size());

        return userCart;
    }

    public void clearCart(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        cartItemRepository.deleteAll(cartItems);
    }

    public boolean checkout(Long userId, String username) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        List<Long> listingIds = new ArrayList<Long>();
        for (CartItem cartItem : cartItems) {
            listingIds.add(cartItem.getListingId());
        }
        List<Listing> listings = listingRepository.findByIdIn(listingIds);

        // if any listings are sold, abort
        for (Listing listing : listings) {
            if (listing.getSold()) {
                return false;
            }
        }

        // create transactions and update listings as sold
        for (Listing listing : listings) {
            listing.setSold(true);
            listingRepository.save(listing);

            Transaction transaction = new Transaction();
            transaction.setListingId(listing.getId());
            transaction.setBuyer(username);
            transaction.setSeller(listing.getSeller());
            transaction.setDate(new Date());
            transaction.setStatus(Transaction.STATUS_CANCELLABLE);
            transactionRepository.save(transaction);
        }

        // empty cart
        cartItemRepository.deleteAll(cartItems);

        return true;
    }

}
