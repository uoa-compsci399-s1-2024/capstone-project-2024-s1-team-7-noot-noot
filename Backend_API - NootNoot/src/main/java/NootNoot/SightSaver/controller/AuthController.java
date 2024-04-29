package NootNoot.SightSaver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import NootNoot.SightSaver.response.AuthenticationResponse;
import NootNoot.SightSaver.service.AuthenticationService;
import NootNoot.SightSaver.request.AuthenticationRequest;
import NootNoot.SightSaver.request.RegisterRequest;

@RestController
@RequestMapping("api/auth")
public class AuthController {

   @Autowired
   private AuthenticationService authenticationService;

   @PostMapping("/register")
   public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
      return ResponseEntity.ok(authenticationService.register(request));
   }

   @PostMapping("/authenticate")
   public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
      return ResponseEntity.ok(authenticationService.authenticate(request));
   }
}